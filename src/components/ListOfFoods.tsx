import { useState } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Share } from '@mui/icons-material';
import ShareModal from './ShareModal';
import { shareFood } from '../service/shareFood';

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


interface Foods {
  time: { seconds: number, nanoseconds: number }, typeFood: string, comida: string, bebida: string, postre: string, id: string
};

interface Props {
  data: Foods[],
  date: string
};

const handlerDelete = (id: string, date: string, foods: any) => {
  swal({
    title: "Estás seguro?",
    text: "Una vez que eliminas una comida, no podrás recuperarla!",
    icon: "warning",
    buttons: ["Cancelar", true],
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        deleteFood(id, date, foods)
        swal("Poof! Tu comida fue borrada!", {
          icon: "success",
        });
      } else {
        swal("Tu comida se encuentra a salvo!");
      }
    });
}


export default function ListOfFoods({ data, date }: Props) {
  const { updateEditFood, foods }: any = useContext(ApplicationContext);
  const [trigger, setTrigger] = useState<{}|null>(null);
  const sendFood = (mail?: string, row?:any) => {
    if(mail){
      shareFood(row, mail);
    }
    setTrigger(null);
  }
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
              <StyledTableRow className={`${row.typeFood}`} key={i}>
                <StyledTableCell component="th" scope="row">
                  {dayjs.unix(row.time.seconds).format("HH:mm")}
                </StyledTableCell>
                <StyledTableCell>{row.typeFood}</StyledTableCell>
                <StyledTableCell>{row.comida}</StyledTableCell>
                <StyledTableCell>{row.bebida}</StyledTableCell>
                <StyledTableCell>{row.postre}</StyledTableCell>
                <StyledTableCell>
                  <span className="c-pointer" onClick={() => updateEditFood(row)}><EditIcon /></span>
                  <span className="c-pointer" onClick={() => setTrigger(row)}><Share /></span>

                  <span className="c-pointer" onClick={() => handlerDelete(row.id, date, foods)}><DeleteIcon /></span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <ShareModal trigger={trigger} fn={sendFood} />
      </TableContainer>
    </>
  );
}








