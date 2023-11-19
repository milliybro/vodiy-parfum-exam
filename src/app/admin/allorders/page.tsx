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
import { request } from "@/server/request";
import { useEffect, useState } from "react";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import convertTimestamp from "@/utils/convertTime";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import Chip from "@mui/material/Chip";
import Loading from "@/components/loading/Loading";
import Alert from "@mui/material/Alert";
import Pagination from "@mui/material/Pagination";

import "./style.scss";

const StyledTableCell: any = styled(TableCell)(({ theme }) => ({
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

const AllOrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState(false);
  const [status, setStatus] = useState("ACCEPTED");
  const [newOrders, setNewOrders] = useState([]);
  const [page, setPage] = useState(1);


  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const { data } = await request.get("payment");
        const orders = data?.filter((order: any) => order?.status === status);
        setNewOrders(orders);
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [update, status]);

  const confirmOrder = async (id: string) => {
    try {
      setLoading(true);
      const {
        data: { msg },
      } = await request.post(`payment/${id}`);
      setUpdate(!update);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id: string) => {
    try {
      setLoading(true);
      const {
        data: { msg },
      } = await request.put(`payment/${id}`);
      setUpdate(!update);
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div className="allorders-page">
      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Alert className="alert" severity="info">
            Umumiy buyurtmalar soni: {newOrders?.length} ta
          </Alert>
          <div className="table-header">
            <div className="category-selector">
              <select onChange={handleCategory} name="category" id="category">
                <option value="ACCEPTED">Qabul qilingan</option>
                <option value="SUCCESS">Yetkazildi</option>
                <option value="CANCELED">Bekor qilingan</option>
              </select>
            </div>
          </div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  Buyurtma raqami
                </StyledTableCell>
                <StyledTableCell align="center">Sharx</StyledTableCell>
                <StyledTableCell align="center">Qabul qilindi</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {newOrders?.map((order: any) => (
                <StyledTableRow key={order?._id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {order?._id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {order?.comment?.slice(0, 15) || "Sharx mavjud emas"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {convertTimestamp(order?.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Chip
                      className={`status ${order?.status.toLowerCase()}`}
                      label={order?.status}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    className="action-btn-container"
                    align="center"
                  >
                    <button
                      className="cancel-btn"
                      onClick={() => cancelOrder(order?._id)}
                    >
                      Bekor qilish
                    </button>
                    <button
                      className="confirm-btn"
                      onClick={() => confirmOrder(order?._id)}
                    >
                      Yetkazildi
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={Math.ceil(newOrders?.length / 10)}
            page={page}
            onChange={handleChange}
          />
        </TableContainer>
      )}
    </div>
  );
};

export default AllOrdersPage;
