import React, { useState } from 'react';
import { TextField, Button, Grid, makeStyles } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { setItem } from '../localStorageHelpers';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    justifyContent: 'center'
  },
  control: {
    padding: theme.spacing(2)
  }
}));

function CreateInvoice({
  showCreatInvoice,
  setShowCreateInvoice,
  invoiceList
}) {
  const [invoiceData, setInvoiceData] = useState({
    uuid: uuidv4(),
    name: '',
    amount: 0
  });

  const [nameError, setError] = useState(false);

  const classes = useStyles();

  function handleChange(e) {
    if (e.target.name === 'amount') {
      setInvoiceData({
        ...invoiceData,
        [e.target.name]: parseFloat(e.target.value)
      });
    } else {
      setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
    }
  }

  function createInvoice(e) {
    e.preventDefault();
    if (!invoiceData.name) {
      setError(true);
    } else {
      const data = JSON.stringify(invoiceList.push(invoiceData));
      setItem('invoiceList', data);
      setShowCreateInvoice(false);
    }
  }

  return (
    <form>
      <Grid className={classes.root} justify="center" container spacing={4}>
        <Grid item xs={12}>
          <TextField
            disabled
            variant="outlined"
            label="ID"
            type="text"
            name="id"
            id="id"
            fullWidth
            onChange={e => handleChange(e)}
            defaultValue={invoiceData.uuid}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Name"
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            fullWidth
            error={nameError}
            onChange={e => handleChange(e)}
            defaultValue={invoiceData.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Amount"
            placeholder="Amount"
            type="number"
            name="amount"
            id="amount"
            fullWidth
            inputProps={{ min: 0 }}
            min="0"
            onChange={e => handleChange(e)}
            defaultValue={invoiceData.amount}
          />
        </Grid>
        <Grid item xs={5}>
          <Button color="secondary" onClick={() => setShowCreateInvoice(false)}>
            Go Back
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Button color="primary" type="submit" onClick={e => createInvoice(e)}>
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CreateInvoice;
