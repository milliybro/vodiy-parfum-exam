"use client";

import { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { request } from "@/server/request";
import useCategories from "@/store/categories";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "@/components/loading/Loading";
import Alert from "@mui/material/Alert";

import "./style.scss";

const CategoriesPage = () => {
  const {
    data: categories,
    getData: getCategories,
    deleteCategory,
    addCategory,
    loading,
  } = useCategories();
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<{ public_id: string; url: string }>({
    public_id: "",
    url: "",
  });
  const [selected, setSelected] = useState<string | null>(null);

  console.log(loading);

  const [formData, setFormData] = useState({
    name: "",
    image: {},
  });

  const handleClickOpen = () => {
    setOpen(true);
    setPhoto({ public_id: "", url: "" });
    setFormData({
      name: "",
      image: {},
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = new FormData();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    imageData.append("file", file);
    const { data } = await request.post("upload", imageData);
    setPhoto(data);
  };

  const handleCategory = async () => {
    formData.image = photo;
    await addCategory(formData, selected);
    handleClose();
    setSelected(null);
  };

  const handleEdit = async (id: string) => {
    handleClickOpen();
    setSelected(id);
    const { data } = await request.get(`category/${id}`);
    setPhoto({ public_id: data?.image.public_id, url: data?.image.url });
    setFormData({
      name: data?.name || "",
      image: data?.image.url || "",
    });
  };

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ paddingBottom: "100px", paddingTop: "20px" }}>
          <div className="categories__header">
            <Alert className="alert" severity="info">
              Umumiy buyurtmalar soni: {categories?.length} ta
            </Alert>
            <Button
              onClick={handleClickOpen}
              className="add-category-btn"
              variant="contained"
            >
              Kategoriya qo`shish
            </Button>
          </div>
          <div className="categories__row">
            {categories.map((category) => (
              <div key={category?._id} className="category__card">
                <div className="category__img">
                  <Image fill src={category?.image.url} alt={category?.name} />
                </div>
                <div className="category__content">
                  <h3>{category?.name}</h3>
                  <div className="category__btn__container">
                    <button className="tahrir" onClick={() => handleEdit(category?._id)}>
                      Tahrirlash
                    </button>
                    <button className="dele" onClick={() => deleteCategory(category?._id)}>
                      O`chirish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="modal-title">Kategoriya ma`lumotlari</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                size="small"
                margin="dense"
                id="name"
                label="Kategoriya nomi"
                type="text"
                fullWidth
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              {photo?.url ? (
                <div className="upload-photo-container">
                  <Image alt="Image" fill src={photo?.url} />
                </div>
              ) : null}
              <input
                className="upload-photo"
                placeholder="Rasmni yuklang"
                onChange={uploadPhoto}
                type="file"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Bekor qilish</Button>
              <Button onClick={() => handleCategory()}>
                {selected === null ? "Qo`shish" : "Tahrirlash"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Fragment>
  );
};

export default CategoriesPage;
