import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../../pages/Modal';

const AssetCard = ({ asset, onDelete, onEdit, currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAsset, setEditedAsset] = useState({ ...asset });

  const handleEdit = () => {
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    onDelete(asset?._id);
  };

  const handleSave = () => {
    onEdit({ ...editedAsset, lastEditedBy: currentUser });
    setIsModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-4 mb-4'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold mb-2'>{asset?.name}</h2>
        <div className='space-x-2'>
          <button
            className='text-blue-500 hover:text-blue-700'
            onClick={handleEdit}
          >
            <FaEdit />
          </button>
          <button
            className='text-red-500 hover:text-red-700'
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <p className='text-gray-600'>Tag ID: {asset?.tagID}</p>
      <p className='text-gray-600'>Serial Number: {asset?.serialNumber}</p>
      <p className='text-gray-600'>Procurement Date: {new Date(asset?.procurementDate).toLocaleDateString()}</p>
      <p className='text-gray-600'>Last Edited By: {asset?.lastEditedBy}</p>
      <div className='mt-4'>
        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 ${getStatusColor(asset?.status)}`}>
          {asset?.status}
        </span>
        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${getConditionColor(asset?.condition)}`}>
          {asset?.condition}
        </span>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isEditing ? (
          <div>
            <h2 className='text-xl font-bold mb-4'>Edit Asset</h2>
            <input
              type='text'
              className='border p-2 mb-4 w-full'
              value={editedAsset?.name}
              onChange={(e) => setEditedAsset({ ...editedAsset, name: e.target.value })}
              placeholder='Asset Name'
            />
            <input
              type='text'
              className='border p-2 mb-4 w-full'
              value={editedAsset?.tagID}
              onChange={(e) => setEditedAsset({ ...editedAsset, tagID: e.target.value })}
              placeholder='Tag ID'
            />
            <input
              type='text'
              className='border p-2 mb-4 w-full'
              value={editedAsset?.serialNumber}
              onChange={(e) => setEditedAsset({ ...editedAsset, serialNumber: e.target.value })}
              placeholder='Serial Number'
            />
            <input
              type='date'
              className='border p-2 mb-4 w-full'
              value={new Date(editedAsset?.procurementDate).toISOString().split('T')[0]}
              onChange={(e) => setEditedAsset({ ...editedAsset, procurementDate: e.target.value })}
              placeholder='Procurement Date'
            />
            <select
              className='border p-2 mb-4 w-full'
              value={editedAsset?.status}
              onChange={(e) => setEditedAsset({ ...editedAsset, status: e.target.value })}
            >
              <option value='active'>Active</option>
              <option value='maintenance'>Maintenance</option>
              <option value='inactive'>Inactive</option>
            </select>
            <select
              className='border p-2 mb-4 w-full'
              value={editedAsset?.condition}
              onChange={(e) => setEditedAsset({ ...editedAsset, condition: e.target.value })}
            >
              <option value='new'>New</option>
              <option value='good'>Good</option>
              <option value='fair'>Fair</option>
              <option value='poor'>Poor</option>
            </select>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded'
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default AssetCard;
