import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import {
  TextField,
  Button,
  Grid,
  makeStyles,
  IconButton,
  TableRow,
  TableCell
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { getItem, setItem } from './localStorageHelpers';

const options = {
  filter: false,
  search: false,
  pagination: false,
  responsive: 'scrollFullHeight'
};

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

function App() {
  const [showCreatInvoice, setShowCreateInvoice] = useState(false);
  const [invoiceList, setInvoiceList] = React.useState(
    JSON.parse(getItem('invoiceList') || '[]')
  );

  function deleteInvoice(uuid) {
    const invoiceListModified = invoiceList.filter(
      invoice => invoice.uuid !== uuid
    );
    setItem('invoiceList', invoiceListModified);
    setInvoiceList(invoiceListModified);
  }

  function getTotal() {
    return invoiceList
      .map(invoice => invoice.amount)
      .reduce((a, b) => a + b, 0);
  }

  const columns = [
    {
      name: 'uuid',
      label: 'uuid',
      options: {
        sort: false
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        sort: true
      }
    },
    {
      name: 'amount',
      label: 'Amount',
      options: {
        sort: true
      }
    },
    {
      name: 'delete',
      label: 'Delete',
      options: {
        sort: false,
        customBodyRender: (value, tableMetaData) => (
          <IconButton
            color="secondary"
            size="small"
            onClick={() => deleteInvoice(tableMetaData.rowData[0])}
          >
            <DeleteForeverIcon />
          </IconButton>
        )
      }
    }
  ];

  return (
    <div className="App">
      <div>
        {showCreatInvoice ? (
          <CreateInvoice
            showCreatInvoice={showCreatInvoice}
            setShowCreateInvoice={setShowCreateInvoice}
            invoiceList={invoiceList}
          />
        ) : (
          <div style={{ width: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                color="primary"
                onClick={() => setShowCreateInvoice(true)}
              >
                Create Invoice
              </Button>
            </div>
            <div>
              <MUIDataTable
                title={'Invoices List'}
                data={invoiceList}
                columns={columns}
                options={options}
              />
              <div
                style={{
                  fontSize: 20,
                  padding: 10,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <span style={{ fontWeight: 700 }}>Total:&nbsp;</span>
                {getTotal()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
