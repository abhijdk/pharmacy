-- =======================================================
-- 1. INDEPENDENT / MASTER TABLES (No Foreign Keys)
-- =======================================================

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL,
    module VARCHAR(100)
);

CREATE TABLE branches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_name VARCHAR(150) NOT NULL
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(150) NOT NULL
);

CREATE TABLE manufacturers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    manufacturer_name VARCHAR(150) NOT NULL
);

CREATE TABLE generic_names (
    id INT AUTO_INCREMENT PRIMARY KEY,
    generic_name VARCHAR(150) NOT NULL
);

CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_name VARCHAR(150) NOT NULL
);

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(150) NOT NULL
);

CREATE TABLE doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_name VARCHAR(150) NOT NULL,
    specialization VARCHAR(150)
);

CREATE TABLE ledger_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ledger_name VARCHAR(150) NOT NULL,
    ledger_type VARCHAR(100)
);

-- =======================================================
-- 2. LEVEL 1 DEPENDENCIES
-- =======================================================

CREATE TABLE role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    mobile VARCHAR(20),
    email VARCHAR(150),
    status TINYINT DEFAULT 1,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE medicines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    manufacturer_id INT,
    generic_name_id INT,
    medicine_name VARCHAR(150) NOT NULL,
    hsn_code VARCHAR(50),
    cgst DECIMAL(5,2),
    sgst DECIMAL(5,2),
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id),
    FOREIGN KEY (generic_name_id) REFERENCES generic_names(id)
);

CREATE TABLE prescriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    doctor_id INT,
    prescription_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    store_name VARCHAR(150) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE branch_stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    store_name VARCHAR(150) NOT NULL,
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE vendors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT,
    vendor_name VARCHAR(150) NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

CREATE TABLE doctor_commission_slabs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT,
    commission_percent DECIMAL(5,2),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE doctor_accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT,
    opening_balance DECIMAL(12,2) DEFAULT 0.00,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- =======================================================
-- 3. LEVEL 2 DEPENDENCIES
-- =======================================================

CREATE TABLE user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    role_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE medicine_batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_id INT,
    batch_no VARCHAR(100) NOT NULL,
    mfg_date DATE,
    exp_date DATE,
    purchase_rate DECIMAL(10,2),
    mrp DECIMAL(10,2),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

CREATE TABLE prescription_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prescription_id INT,
    medicine_id INT,
    dosage VARCHAR(100),
    duration VARCHAR(100),
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

CREATE TABLE racks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT,
    rack_no VARCHAR(50),
    FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE vendor_ledger (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vendor_id INT,
    debit DECIMAL(12,2) DEFAULT 0.00,
    credit DECIMAL(12,2) DEFAULT 0.00,
    balance DECIMAL(12,2) DEFAULT 0.00,
    reference_type VARCHAR(100),
    reference_id INT,
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

CREATE TABLE purchase_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT,
    branch_id INT,
    po_no VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE sales_invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_no VARCHAR(100) UNIQUE NOT NULL,
    customer_id INT,
    doctor_id INT,
    branch_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    payment_mode VARCHAR(50),
    amount DECIMAL(12,2),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    expense_category VARCHAR(150),
    amount DECIMAL(12,2),
    FOREIGN KEY (branch_id) REFERENCES branches(id)
);

CREATE TABLE ledger_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ledger_account_id INT,
    debit DECIMAL(12,2) DEFAULT 0.00,
    credit DECIMAL(12,2) DEFAULT 0.00,
    reference_type VARCHAR(100),
    reference_id INT,
    FOREIGN KEY (ledger_account_id) REFERENCES ledger_accounts(id)
);

CREATE TABLE stock_transfer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_branch_id INT,
    to_branch_id INT,
    FOREIGN KEY (from_branch_id) REFERENCES branches(id),
    FOREIGN KEY (to_branch_id) REFERENCES branches(id)
);

CREATE TABLE online_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- =======================================================
-- 4. LEVEL 3 DEPENDENCIES
-- =======================================================

CREATE TABLE stock_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    branch_id INT,
    medicine_batch_id INT,
    transaction_type VARCHAR(50),
    qty DECIMAL(10,2),
    reference_type VARCHAR(100),
    reference_id INT,
    FOREIGN KEY (branch_id) REFERENCES branches(id),
    FOREIGN KEY (medicine_batch_id) REFERENCES medicine_batches(id)
);

CREATE TABLE purchase_order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_order_id INT,
    medicine_id INT,
    qty DECIMAL(10,2),
    rate DECIMAL(10,2),
    FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

CREATE TABLE purchase_returns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_order_id INT,
    FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id)
);

CREATE TABLE sales_invoice_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sales_invoice_id INT,
    medicine_batch_id INT,
    qty DECIMAL(10,2),
    rate DECIMAL(10,2),
    FOREIGN KEY (sales_invoice_id) REFERENCES sales_invoices(id),
    FOREIGN KEY (medicine_batch_id) REFERENCES medicine_batches(id)
);

CREATE TABLE sales_returns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sales_invoice_id INT,
    FOREIGN KEY (sales_invoice_id) REFERENCES sales_invoices(id)
);

CREATE TABLE shelves (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rack_id INT,
    shelf_no VARCHAR(50),
    FOREIGN KEY (rack_id) REFERENCES racks(id)
);

CREATE TABLE doctor_commission_ledger (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT,
    sales_invoice_id INT,
    commission_amount DECIMAL(12,2),
    paid_amount DECIMAL(12,2) DEFAULT 0.00,
    balance_amount DECIMAL(12,2),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (sales_invoice_id) REFERENCES sales_invoices(id)
);

-- =======================================================
-- 5. LEVEL 4 DEPENDENCIES
-- =======================================================

CREATE TABLE purchase_return_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    purchase_return_id INT,
    medicine_batch_id INT,
    qty DECIMAL(10,2),
    FOREIGN KEY (purchase_return_id) REFERENCES purchase_returns(id),
    FOREIGN KEY (medicine_batch_id) REFERENCES medicine_batches(id)
);

CREATE TABLE sales_return_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sales_return_id INT,
    medicine_batch_id INT,
    qty DECIMAL(10,2),
    FOREIGN KEY (sales_return_id) REFERENCES sales_returns(id),
    FOREIGN KEY (medicine_batch_id) REFERENCES medicine_batches(id)
);

CREATE TABLE medicine_stock_locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_batch_id INT,
    shelf_id INT,
    quantity DECIMAL(10,2),
    FOREIGN KEY (medicine_batch_id) REFERENCES medicine_batches(id),
    FOREIGN KEY (shelf_id) REFERENCES shelves(id)
);

CREATE TABLE stock_transfer_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stock_transfer_id INT,
    medicine_batch_id INT,
    qty DECIMAL(10,2),
    FOREIGN KEY (stock_transfer_id) REFERENCES stock_transfer(id),
    FOREIGN KEY (medicine_batch_id) REFERENCES medicine_batches(id)
);

CREATE TABLE online_order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    online_order_id INT,
    medicine_batch_id INT,
    qty DECIMAL(10,2),
    FOREIGN KEY (online_order_id) REFERENCES online_orders(id),
    FOREIGN KEY (medicine_batch_id) REFERENCES medicine_batches(id)
);