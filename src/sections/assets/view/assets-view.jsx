import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import AssetSort from '../asset-sort';
import AssetFilters from '../asset-filters';
import AssetList from '../AssetList';
import axios from 'axios';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['active', 'maintenance', 'inactive'];
const CONDITION_OPTIONS = ['new', 'good', 'fair', 'poor'];

export default function AssetsView() {
  const [assets, setAssets] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [sortOption, setSortOption] = useState('new');
  const [filters, setFilters] = useState({
    status: '',
    condition: '',
    startDate: '',
    endDate: '',
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    tagID: '',
    serialNumber: '',
    name: '',
    procurementDate: '',
    status: '',
    condition: '',
    addedBy: 'User1', // Example user, replace with actual user data
  });

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleFilter = (filterValues) => {
    setFilters(filterValues);
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleAddAsset = async () => {
    setAssets([...assets, { ...newAsset, _id: Date.now().toString() }]);
    setOpenAddModal(false);
    // Function to handle adding a new asset
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: `${baseUrl}/assets`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-auth-token': `${token}`
    //   },
    //   data: {}
    // };

    // await axios.request(config)
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   });

   
  };


  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <AssetFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onFilter={handleFilter}
          />

          <AssetSort onSort={handleSort} />
        </Stack>
        <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
          Add Asset
        </Button>
      </Stack>

      <AssetList sortOption={sortOption} filters={filters} setAssets={setAssets} assets={assets} />

      <Modal
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="add-asset-modal"
        aria-describedby="add-asset-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="add-asset-modal" variant="h6" component="h2">
            Add New Asset
          </Typography>
          <TextField
            margin="dense"
            label="Tag ID"
            fullWidth
            value={newAsset.tagID}
            onChange={(e) => setNewAsset({ ...newAsset, tagID: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Serial Number"
            fullWidth
            value={newAsset.serialNumber}
            onChange={(e) => setNewAsset({ ...newAsset, serialNumber: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newAsset.name}
            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Procurement Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newAsset.procurementDate}
            onChange={(e) => setNewAsset({ ...newAsset, procurementDate: e.target.value })}
          />
          <Select
            margin="dense"
            fullWidth
            value={newAsset.status}
            onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Select Status</em>
            </MenuItem>
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            fullWidth
            value={newAsset.condition}
            onChange={(e) => setNewAsset({ ...newAsset, condition: e.target.value })}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Select Condition</em>
            </MenuItem>
            {CONDITION_OPTIONS.map((condition) => (
              <MenuItem key={condition} value={condition}>
                {condition}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleAddAsset} color="primary" variant="contained" sx={{ mt: 2 }}>
            Add Asset
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
