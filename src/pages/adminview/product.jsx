import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { ListPlus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import CommonForm from '@/components/common/form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from '../../components/adminview/image-upload';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/product-slice';
import AdminProductTile from '@/components/adminview/product-tile';

const initialFormData={
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0, 
}

const Adminproduct = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imagefile, setImagefile] = useState("");
  const [uploadedImageUrl , setuploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId , setCurrentEditedId] = useState(null);
  const {productList} = useSelector(state => state.adminProducts);

  const dispatch = useDispatch();

  function onSubmit (e){
    e.preventDefault();
    currentEditedId !== null ?
    dispatch(editProduct({
      id: currentEditedId,
      formData
    })).then((data)=>{
      console.log(data,"edit product");
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
      }
    })
    :dispatch(addNewProduct({
      ...formData,
      image : uploadedImageUrl
    })).then((data)=>{
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setOpenCreateProductsDialog(false);
        setImagefile(null);
        setFormData(initialFormData);
        message.success("Product added Successfully")
      } 
    })
  }

  function handleDelete (getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
    }
   

  useEffect(()=>{
    dispatch(fetchAllProducts());
  },[dispatch])

  console.log(productList,'product list')
  return (
    <>
    <div className="mb-5 w-full flex justify-end">
      <Button onClick={()=>{
        setOpenCreateProductsDialog(true);
        setFormData(initialFormData);
        setCurrentEditedId(null);
      }}>
        <ListPlus/>
        Add Product
      </Button>
    </div>
    <div className='grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      {
        productList && productList.length > 0 ?
        productList.map(productItem => 
        <AdminProductTile 
        setOpenCreateProductsDialog={setOpenCreateProductsDialog}
        setFormData={setFormData}
        setCurrentEditedId={setCurrentEditedId}
        product={productItem} 
        handleDelete={handleDelete}
        />
       )
        :
       null
      }
    </div>
    <Sheet open={openCreateProductsDialog} onOpenChange={()=>{
      setOpenCreateProductsDialog(false)
    }}>
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader>
          <SheetTitle>
            {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            
          </SheetTitle>
          <ProductImageUpload 
            imagefile={imagefile} 
            setImagefile={setImagefile} 
            uploadedImageUrl={uploadedImageUrl} 
            setuploadedImageUrl={setuploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode = {currentEditedId !== null}
          />
          
          <div className='py-6'>
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Update" : "Add"}
              onSubmit={onSubmit}
              isBtnDisabled ={!isFormValid()}
            />
          </div>
        </SheetHeader>

      </SheetContent>

    </Sheet>

    </>
  )
}

export default Adminproduct;