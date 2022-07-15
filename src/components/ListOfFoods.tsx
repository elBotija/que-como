import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { ApplicationContext } from '../ApplicationContext';
import { deleteFood } from '../service/deleteFood';
import swal from 'sweetalert';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


interface Foods { 
  time: { seconds:number, nanoseconds: number}, typeFood: string, comida: string, bebida: string, postre: string, id: string
};   

interface Props { 
  data: Foods[],
  date: string
};   

const handlerDelete = (id:string) => {
  swal({
    title: "Estás seguro?",
    text: "Una vez que eliminas una comida, no podrás recuperarla!",
    icon: "warning",
    buttons: ["Cancelar", true,],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      deleteFood(id)
      swal("Poof! Tu comida fue borrada!", {
        icon: "success",
      });
    } else {
      swal("Tu comida se encuentra a salvo!");
    }
  });
}

export default function ListOfFoods({ data, date }: Props) {
  const { updateEditFood }: any = useContext(ApplicationContext);
  return (
    <>
      <h2>{date}</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Hora</StyledTableCell>
              <StyledTableCell>Tipo</StyledTableCell>
              <StyledTableCell>Comida</StyledTableCell>
              <StyledTableCell>Bebida</StyledTableCell>
              <StyledTableCell>Postre</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {dayjs.unix(row.time.seconds).format("HH:mm") }
                </StyledTableCell>
                <StyledTableCell>{row.typeFood}</StyledTableCell>
                <StyledTableCell>{row.comida}</StyledTableCell>
                <StyledTableCell>{row.bebida}</StyledTableCell>
                <StyledTableCell>{row.postre}</StyledTableCell>
                <StyledTableCell>
                  <span onClick={()=> updateEditFood(row)}>edit | </span>
                  <span onClick={()=> handlerDelete(row.id)}>delete</span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}








