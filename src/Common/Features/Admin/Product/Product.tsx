import { useTranslation } from "react-i18next";
import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { LayoutContentWrapper } from "../../../Layout";
import AdminProductHeaderAction from "./Components/AdminProductHeaderAction";
import AdminProductTable from "./Components/AdminProductTable";
import AdminProductModificationModal from "./Components/AdminProductModificationModal";
import { ConfirmationModal } from "../../../Components";
import { ProductDataType } from "../../../../App/Types/Common/productType";
import { ResponseMetaType } from "../../../../App/Types/Common";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../../../../App/Services/App/productService";
import { useDocumentTitle } from "../../../Hooks";
import useToast from "../../../Hooks/useToast";

const Product = () => {
  const { t } = useTranslation("admin");

  const [productData, setProductData] = useState<ProductDataType[]>([]);
  const [meta, setMeta] = useState<ResponseMetaType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowModificationModal, setIsShowModificationModal] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<Key | null>(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const toast = useToast();

  const selectedProduct = useMemo(() => {
    return productData.find((item) => item.uuid === selectedProductId) ?? null;
  }, [selectedProductId, productData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id?: Key) => {
    setSelectedProductId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedProductId(null);
  }, []);

  const handleClickDeleteButton = useCallback((id?: Key) => {
    setSelectedProductId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const { data, meta: metaData } = await getProducts({
        expand: ["product__category_uuid"],
      });
      setProductData(data);
      setMeta(metaData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteProduct(selectedProductId as number);
      toast.success("deleteSuccessfully");
    } finally {
      fetchData();
    }
  }, [selectedProductId, toast, fetchData]);

  useDocumentTitle(t("productManagement"));

  return (
    <LayoutContentWrapper
      title={<>{t("productManagement")}</>}
      id="adminSidebar"
      action={<AdminProductHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminProductTable
        data={productData}
        meta={meta}
        isLoading={isLoading}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
      />
      <AdminProductModificationModal
        isOpen={isShowModificationModal}
        product={selectedProduct}
        onCreate={createProduct}
        onCreated={fetchData}
        onEdit={editProduct}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
      <ConfirmationModal
        title={t("deleteProduct")}
        message={t("deleteMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleDelete}
      />
    </LayoutContentWrapper>
  );
};

export default Product;
