import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ShareModalProps {
  trigger: {}|null;
  fn: (mail?:string, row?:any) => void;
}

export default function ShareModal({trigger, fn}: ShareModalProps) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");

  React.useEffect(() => {
    if(trigger) {
      setOpen(!open);
    }
  }, [trigger]);
  
  const handleClose = () => {
    fn();
    setOpen(false);
  };
  const handleSub = () => {
    fn(email, trigger);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Compartir comida</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Comparte esta comida con un amigo que use la plataforma.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSub}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}