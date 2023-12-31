"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, Fragment, useState } from "react";
import useUsers from "@/store/users";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loading from "@/components/loading/Loading";
import { InputBase } from "@mui/material";
import Image from "next/image";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

import { request } from "@/server/request";

import "./style.scss";
import useProducts from "@/store/products";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductsTable() {
  const {
    products,
    total,
    getProducts,
    addProduct,
    editProduct,
    deleteProduct,
  } = useProducts();

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<null | string>(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState<{ public_id: string; url: string }>({
    public_id: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let timerId = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    quantity: "",
    sold: "",
    image: {},
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setPhoto({ public_id: "", url: "" });
    setCategory("");
    setFormData({
      title: "",
      category: "",
      price: "",
      quantity: "",
      sold: "",
      image: {},
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProduct = async () => {
    formData.category = category;
    formData.image = photo;
    await addProduct(formData, selected);
    handleClose();
    setSelected(null);
  };

  const handleEdit = async (id: string) => {
    handleClickOpen();
    setSelected(id);
    const { data } = await request.get(`product/${id}`);
    setCategory(data?.category?._id || "");
    setPhoto({ public_id: data?.image.public_id, url: data?.image.url });
    setFormData({
      title: data?.title || "",
      category: data?.category._id || "",
      price: data?.price || "",
      quantity: data?.quantity || "",
      sold: data?.sold || "",
      image: data?.image.url || "",
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const { data: categories } = await request.get("category");
      setCategories(categories);
    };
    getCategories();
  }, []);

  const sortByCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    setFormData({ ...formData, category: newCategory });
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = new FormData();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    imageData.append("file", file);
    const { data } = await request.post("upload", imageData);
    setPhoto(data);
  };

  useEffect(() => {
    getProducts(page, search);
  }, [getProducts, page, search]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div
            className="users-table-header"
            style={{ marginTop: "20px", paddingTop: "20px" }}
          >
            <Alert className="alert" severity="info">
              Umumiy mahsulotlar soni: {total} ta
            </Alert>
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                fullWidth={true}
                placeholder="Mahsulotlarni izlash..."
                value={search}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleSearch(event)
                }
                inputProps={{ "aria-label": "search products" }}
              />
            </Paper>
            <Button onClick={handleClickOpen}>Mahsulot qo`shish</Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Rasmi</StyledTableCell>
                  <StyledTableCell align="center">Nomi</StyledTableCell>
                  <StyledTableCell align="center">Narxi</StyledTableCell>
                  <StyledTableCell align="center">Miqdori</StyledTableCell>
                  <StyledTableCell align="center">Sotildi</StyledTableCell>
                  <StyledTableCell align="center">Kategoriyasi</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((product) => (
                  <StyledTableRow key={product?._id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Image
                        src={product?.image.url}
                        alt={product?.title}
                        height={50}
                        width={50}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {product?.title || "Noma`lum"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product?.price || "X"} so`m
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product?.quantity || "Aniqlanmagan"} dona
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product?.sold || "0"} dona
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {product?.category.name}
                    </StyledTableCell>
                    <StyledTableCell className="action-btn" align="center">
                      <button
                        onClick={() => handleEdit(product?._id)}
                        className="edit-btn"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => deleteProduct(product?._id)}
                        className="delete-btn"
                      >
                        O`chirish
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack className="pagination" spacing={2}>
            <Pagination
              count={Math.ceil(total / 10)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle className="modal-title">
              Mahsulot ma`lumoti
            </DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                size="small"
                margin="dense"
                id="title"
                label="Nomi"
                type="text"
                fullWidth
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
              <TextField
                size="small"
                autoFocus
                margin="dense"
                id="price"
                label="Narxi"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <TextField
                  autoFocus
                  size="small"
                  margin="dense"
                  id="quantity"
                  label="Miqdori"
                  type="number"
                  fullWidth
                  value={formData.quantity}
                  onChange={(e) =>
                    handleInputChange("quantity", e.target.value)
                  }
                />
                <TextField
                  autoFocus
                  size="small"
                  margin="dense"
                  id="sold"
                  label="Sotildi"
                  type="number"
                  fullWidth
                  value={formData.sold}
                  onChange={(e) =>
                    handleInputChange("sold", e.target.value)
                  }
                />
              </div>
              <select
                onChange={(event) => sortByCategory(event)}
                value={category}
                className="category-filter"
                style={{}}
              >
                <option value="" style={{ height: "100%" }}>
                  Kategoriyasi
                </option>
                {categories?.map((category: { _id: string; name: string }) => (
                  <option
                    key={category?._id}
                    style={{ height: "100%" }}
                    value={category?._id}
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
              {photo?.url ? (
                <div className="upload-photo-container">
                  <Image alt="Image" fill src={photo?.url} />
                </div>
              ) : null}
              <input
                className="upload-photo"
                placeholder="Upload an image"
                onChange={uploadPhoto}
                type="file"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Bekor qilish</Button>
              <Button onClick={() => handleProduct()}>
                {selected === null ? "Qo`shish" : "Tahrirlash"}
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </>
  );
}
