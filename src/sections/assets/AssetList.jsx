import React, { useEffect, useState } from 'react';
import AssetCard from './AssetCard';
import Button from '@mui/material/Button';


const AssetList = ({ sortOption, filters }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Dummy data for assets
    const dummyAssets = [
      {
        _id: '1',
        tagID: 'T123',
        serialNumber: 'S123',
        name: 'Asset 1',
        procurementDate: '2023-01-01T00:00:00.000Z',
        status: 'active',
        condition: 'new',
        addedBy: 'User1',
        lastEditedBy: 'User1',
      },
      {
        _id: '2',
        tagID: 'T124',
        serialNumber: 'S124',
        name: 'Asset 2',
        procurementDate: '2022-05-15T00:00:00.000Z',
        status: 'maintenance',
        condition: 'good',
        addedBy: 'User2',
        lastEditedBy: 'User2',
      },
      {
        _id: '3',
        tagID: 'T125',
        serialNumber: 'S125',
        name: 'Asset 3',
        procurementDate: '2021-07-21T00:00:00.000Z',
        status: 'inactive',
        condition: 'poor',
        addedBy: 'User3',
        lastEditedBy: 'User3',
      },
      // Add more dummy assets as needed
    ];

    setAssets(dummyAssets);
  }, []);

  const applyFilters = (asset) => {
    if (filters.status && asset.status !== filters.status) return false;
    if (filters.condition && asset.condition !== filters.condition) return false;
    if (filters.startDate && new Date(asset.procurementDate) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(asset.procurementDate) > new Date(filters.endDate)) return false;
    return true;
  };

  const sortedAssets = [...assets]
    .filter(applyFilters)
    .sort((a, b) => {
      if (sortOption === 'new' || sortOption === 'good' || sortOption === 'fair' || sortOption === 'poor') {
        return a.condition === sortOption ? -1 : 1;
      }
      return a.status === sortOption ? -1 : 1;
    });

  const addAsset = (newAsset) => {
    setAssets([...assets, { ...newAsset, _id: Date.now().toString() }]);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Assets</h1>
      {sortedAssets.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedAssets.map((asset) => (
            <AssetCard
              key={asset._id}
              asset={asset}
            />
          ))}
        </div>
      ) : (
        <div className='text-center mt-10'>
          <h2 className='text-xl font-semibold'>No assets to display</h2>
          <p className='text-gray-600'>Try adjusting your filters or adding new assets.</p>
          <Button variant="contained" color="primary" onClick={() => setOpenAddModal(true)}>
            Add Asset
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssetList;
