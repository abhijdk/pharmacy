import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { THEME } from '../../constants/theme';
import { Card, Button, Input, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Modal } from '../../components/ui';
import { Search, Plus, MoreVertical, AlertTriangle, Pill, Tag, Hash, DollarSign } from 'lucide-react';

// Initial Mock Data
const INITIAL_INVENTORY = [
  { id: 'MED-001', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 342, price: '$12.50', status: 'In Stock' },
  { id: 'MED-002', name: 'Lisinopril 10mg', category: 'Cardiovascular', stock: 18, price: '$8.00', status: 'Low Stock' },
  { id: 'MED-003', name: 'Ibuprofen 400mg', category: 'Pain Relief', stock: 890, price: '$5.50', status: 'In Stock' },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState(INITIAL_INVENTORY); // Turned data into state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form setup for the Add Modal
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleAddMedicine = async (data) => {
    setIsSubmitting(true);
    
    // Simulate API Call to Spring Boot
    await new Promise(resolve => setTimeout(resolve, 800));

    // Determine status based on stock input
    const stockNum = parseInt(data.stock);
    let newStatus = 'In Stock';
    if (stockNum === 0) newStatus = 'Out of Stock';
    else if (stockNum < 20) newStatus = 'Low Stock';

    // Create new medicine object
    const newMedicine = {
      id: `MED-00${inventory.length + 1}`,
      name: data.name,
      category: data.category,
      stock: stockNum,
      price: `$${parseFloat(data.price).toFixed(2)}`,
      status: newStatus
    };

    // Update UI state, close modal, and reset form
    setInventory([newMedicine, ...inventory]);
    setIsSubmitting(false);
    setIsModalOpen(false);
    reset();
  };

  const filteredInventory = inventory.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className={`${THEME.styles.headingPremium} text-2xl lg:text-3xl mb-1`}>Inventory Management</h1>
          <p className={THEME.styles.bodyMuted}>Track and manage pharmaceutical stock levels.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add New Medicine
        </Button>
      </div>

      {/* Toolbar & Data Table */}
      <Card className="flex flex-col overflow-hidden">
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="w-full max-w-md relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by ID or Medicine Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-darker border border-white/[0.1] rounded-lg pl-10 pr-4 py-2 text-sm text-light placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU ID</TableHead>
              <TableHead>Medicine Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-gray-500">{item.id}</TableCell>
                <TableCell className="text-light font-medium">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  <span className={item.stock < 20 ? "text-red-400 font-medium flex items-center gap-2" : ""}>
                    {item.stock} {item.stock < 20 && <AlertTriangle size={14} />}
                  </span>
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium ${
                    item.status === 'In Stock' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                    item.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 
                    'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <button className="p-2 text-gray-500 hover:text-white transition-colors rounded-md hover:bg-white/[0.05]">
                    <MoreVertical size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Reusable Modal Component */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); reset(); }}
        title="Register New Medicine"
      >
        <form onSubmit={handleSubmit(handleAddMedicine)} className="space-y-4">
          <Input
            label="Medicine Name"
            icon={Pill}
            placeholder="e.g. Paracetamol 500mg"
            error={errors.name?.message}
            {...register('name', { required: 'Name is required' })}
          />
          
          <Input
            label="Category"
            icon={Tag}
            placeholder="e.g. Pain Relief"
            error={errors.category?.message}
            {...register('category', { required: 'Category is required' })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Initial Stock"
              type="number"
              icon={Hash}
              placeholder="0"
              error={errors.stock?.message}
              {...register('stock', { 
                required: 'Required',
                min: { value: 0, message: 'Cannot be negative' }
              })}
            />
            
            <Input
              label="Unit Price ($)"
              type="number"
              step="0.01"
              icon={DollarSign}
              placeholder="0.00"
              error={errors.price?.message}
              {...register('price', { 
                required: 'Required',
                min: { value: 0.01, message: 'Must be > 0' }
              })}
            />
          </div>

          <div className="pt-4 flex gap-3 justify-end border-t border-white/[0.05]">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => { setIsModalOpen(false); reset(); }}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Save Medicine
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}