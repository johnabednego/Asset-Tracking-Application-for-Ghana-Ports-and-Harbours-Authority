import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useState } from 'react';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['active', 'banned'];
const VERIFIED_OPTIONS = ['yes', 'no'];

// ----------------------------------------------------------------------

export default function EmployeeFilters({ openFilter, onOpenFilter, onCloseFilter, onFilter }) {
  const [filters, setFilters] = useState({
    status: '',
    isVerified: '',
  });

  const handleFilterChange = (name) => (event) => {
    setFilters({
      ...filters,
      [name]: event.target.value,
    });
  };

  const handleApplyFilters = () => {
    onFilter(filters);
    onCloseFilter();
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      isVerified: '',
    });
    onFilter({
      status: '',
      isVerified: '',
    });
  };

  const renderStatus = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Status</Typography>
      <RadioGroup value={filters.status} onChange={handleFilterChange('status')}>
        {STATUS_OPTIONS.map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
        ))}
      </RadioGroup>
    </Stack>
  );

  const renderVerified = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Verified</Typography>
      <RadioGroup value={filters.isVerified} onChange={handleFilterChange('isVerified')}>
        {VERIFIED_OPTIONS.map((item) => (
          <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
        ))}
      </RadioGroup>
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            {renderStatus}
            {renderVerified}
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handleClearFilters}
            sx={{ mt: 2 }}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

EmployeeFilters.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  onFilter: PropTypes.func,
};
