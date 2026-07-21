import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LuPlus as Plus } from 'react-icons/lu';
import { useDispatch, useSelector } from "react-redux";

// Components & Actions
import CreateBranchModal from "../components/Modal/CreateBranchModal";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import BranchList from "./BranchList";
import Button from "../../../components/Button";
import Loader from "../../../components/common/Loader";
import { getDistrictsRequest } from "../actions/getDistrictsActions";
import { getBranchesRequest } from "../actions/getBranchesActions";
import { 
  deleteBranchRequest, 
  deleteBranchClear 
} from "../actions/deleteBranchActions";

const Container = styled.div`
  padding: 24px;
  background: #fdfdfd;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TitleSection = styled.div`
  h1 {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-main);
    margin: 0;
  }
  p {
    font-size: 14px;
    color: var(--text-muted);
    margin: 4px 0 0 0;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div`
  background: white;
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`;

const SectionHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-main);
  }
`;

const BranchDashboard = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDistrictsRequest());
    dispatch(getBranchesRequest());
  }, [dispatch]);

  const { data: branches, loading, error } = useSelector(
    (state) => state.branches
  );

  const { data: deleteResponse } = useSelector((state) => state.deleteBranch);

  useEffect(() => {
    if (deleteResponse) {
      dispatch(getBranchesRequest());
      setTimeout(() => dispatch(deleteBranchClear()), 2000);
    }
  }, [deleteResponse, dispatch]);

  const handleDeleteBranch = (branchId) => {
    setBranchToDelete(branchId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (branchToDelete) {
      dispatch(deleteBranchRequest(branchToDelete));
    }
    setShowDeleteConfirm(false);
    setBranchToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setBranchToDelete(null);
  };

  const handleEditBranch = (branch) => {
    setSelectedBranch(branch);
    setIsCreateOpen(true);
  };

  return (
    <Container>
      <Header>
        <TitleSection>
          <h1>Branch Dashboard</h1>
          <p>Manage your lab network, regions, and regional nodal officers.</p>
        </TitleSection>
        <Button 
          variant="primary" 
          icon={<Plus size={20} />} 
          style={{ 
            padding: '12px 20px', 
            borderRadius: '10px', 
            fontSize: '15px', 
            fontWeight: 700,
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 4px 6px -1px rgba(0, 82, 255, 0.1)'
          }}
          onClick={() => {
            setSelectedBranch(null);
            setIsCreateOpen(true);
          }}
        >
          Create Branch
        </Button>
      </Header>

      <ContentCard>
        <SectionHeader>
          <h3>Registered Branches</h3>
        </SectionHeader>
        
        {loading && <Loader text="Loading branches..." />}
        {error && <p style={{ color: "#D92D20", fontSize: '14px' }}>{error}</p>}
        {!loading && !error && (
          <BranchList 
            branches={branches} 
            onDelete={handleDeleteBranch} 
            onEdit={handleEditBranch}
          />
        )}
      </ContentCard>

      <CreateBranchModal
        open={isCreateOpen}
        initialData={selectedBranch}
        onClose={() => {
          setIsCreateOpen(false);
          setSelectedBranch(null);
        }}
      />

      <ConfirmModal
        show={showDeleteConfirm}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Branch"
        message="Are you sure you want to delete this branch? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </Container>
  );
};

export default BranchDashboard;
