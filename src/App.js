import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button, IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './App.css';
import { getItem, setItem } from './localStorageHelpers';
import CreateInvoice from './components/CreateInvoice';

const options = {
  filter: false,
  search: false,
  pagination: false,
  responsive: 'scrollFullHeight'
};

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
