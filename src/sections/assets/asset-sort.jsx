import { useState } from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { listClasses } from '@mui/material/List';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'inactive', label: 'Inactive' },
];

export default function AssetSort({ onSort }) {
  const [open, setOpen] = useState(null);
  const [selectedOption, setSelectedOption] = useState('newest');

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (option) => {
    setOpen(null);
    if (option) {
      setSelectedOption(option.value);
      onSort(option.value);
    }
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {SORT_OPTIONS.find((option) => option.value === selectedOption)?.label}
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={() => handleClose(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0,
              },
            },
          },
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selectedOption}
            onClick={() => handleClose(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
