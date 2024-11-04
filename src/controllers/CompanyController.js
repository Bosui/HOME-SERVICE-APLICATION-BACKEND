// controllers/CompanyController.js

import Company from '../models/Company.js'; // Įsitikinkite, kad turite sukurtą Company modelį

// Gauti visas kompanijas
export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving companies', error });
    }
};

// Sukurti naują kompaniją
export const createCompany = async (req, res) => {
    const { name, location, industry } = req.body;
    try {
        const newCompany = new Company({ name, location, industry });
        await newCompany.save();
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).json({ message: 'Error creating company', error });
    }
};

// Gauti kompaniją pagal ID
export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving company', error });
    }
};

// Atnaujinti kompanijos informaciją pagal ID
export const updateCompany = async (req, res) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(updatedCompany);
    } catch (error) {
        res.status(500).json({ message: 'Error updating company', error });
    }
};

// Ištrinti kompaniją pagal ID
export const deleteCompany = async (req, res) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting company', error });
    }
};
