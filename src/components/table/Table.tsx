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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Loading from "@/components/loading/Loading";
import { InputBase } from "@mui/material";
import Alert from "@mui/material/Alert";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { request } from "@/server/request";

import "./style.scss";

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

export default function GeneralTable() {
  const { users, total, getUsers, addUser, deleteUser } = useUsers();

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let timerId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  console.log(loading);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    password: "",
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
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      phoneNumber: "",
      password: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUser = async () => {
    await addUser(formData, selected);
    handleClose();
    setSelected(null);
  };

  const handleEdit = async (id: string) => {
    handleClickOpen();
    setSelected(id);
    const { data } = await request.get(`user/${id}`);
    setFormData({
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      username: data?.username || "",
      phoneNumber: data?.phoneNumber || "",
      password: data?.password || "",
    });
  };

  useEffect(() => {
    getUsers(page, search);
  }, [getUsers, page, search]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <div className="users-table-header">
            <Alert className="alert" severity="info">
              Umumiy foydalanuvchilar soni: {total} ta
            </Alert>
            <Paper
              component="form"
              style={{ gap: "20px" }}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="users-top">
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  fullWidth={true}
                  placeholder="Foydalanuvchilarni izlash..."
                  style={{ width: "90%", padding: "10px" }}
                  value={search}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearch(event)
                  }
                  inputProps={{ "aria-label": "search products" }}
                />
              </div>
            </Paper>
            <Button className="addUsers" onClick={handleClickOpen}>
              Foydalanuvchi qo`shish
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Username</StyledTableCell>
                  <StyledTableCell align="center">Ismi</StyledTableCell>
                  <StyledTableCell align="center">Familiyasi</StyledTableCell>
                  <StyledTableCell align="center">
                    Telefon raqami
                  </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <StyledTableRow key={user?._id}>
                    <StyledTableCell align="center">
                      @{user?.username}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user?.firstName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user?.lastName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user?.phoneNumber}
                    </StyledTableCell>
                    <StyledTableCell className="action-btn" align="center">
                      <button
                        onClick={() => handleEdit(user?._id)}
                        className="edit-btn"
                      >
                        Tahrirlash
                      </button>
                      <button
                        onClick={() => deleteUser(user?._id)}
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
            <DialogTitle className="modal-title">Foydalanuvchi ma`lumoti</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                size="small"
                autoFocus
                margin="dense"
                id="username"
                label="@Username"
                type="text"
                fullWidth
                value={formData.username}
                onChange={(e) =>
                  handleInputChange("username", e.target.value)
                }
              />
              <TextField
                autoFocus
                size="small"
                margin="dense"
                id="firstName"
                label="Ismi"
                type="text"
                fullWidth
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
              <TextField
                autoFocus
                size="small"
                margin="dense"
                id="lastName"
                label="Familiyasi"
                type="text"
                fullWidth
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
              <div
                style={{ alignItems: "center", gap: "10px" }}
              >
                <TextField
                  size="small"
                  autoFocus
                  margin="dense"
                  id="phoneNumber"
                  label="Telefon raqami"
                  type="text"
                  fullWidth
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                />
                <TextField
                  size="small"
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Parol"
                  type="text"
                  fullWidth
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                />
              </div>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Bekor qilish</Button>
              <Button onClick={() => handleUser()}>
                {selected === null ? "Qo`shish" : "Tahrirlash"}
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </>
  );
}
