import React, { useState } from "react";
import styled from "styled-components";
import { LuTrash2 as Trash2, LuMapPin as MapPin, LuPhone as Phone, LuMail as Mail, LuUser as User, LuShieldCheck as ShieldCheck, LuPenLine as Edit2 } from 'react-icons/lu';

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 10px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;

  @media (max-width: 850px) {
    min-width: unset;
    display: block;
    
    thead { display: none; }
    tbody { display: block; }
    
    tr {
      display: block;
      padding: 16px 0;
      border-bottom: 8px solid #f8fafc;
    }
  }
`;

const Th = styled.th`
  padding: 14px 16px;
  text-align: left;
  background: #F9FAFB;
  font-size: 11px;
  font-weight: 700;
  color: #475467;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid var(--border);
`;

const Td = styled.td`
  padding: 18px 16px;
  font-size: 14px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
  background: white;
  transition: background 0.2s ease;

  @media (max-width: 850px) {
    display: grid;
    grid-template-columns: 120px 1fr;
    align-items: center;
    padding: 12px 16px !important;
    border-bottom: 1px solid #f1f5f9 !important;
    gap: 12px;
    
    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: var(--text-muted);
      font-size: 11px;
      text-transform: uppercase;
      text-align: left;
      justify-self: start;
    }

    & > *:not(::before) {
      justify-self: start;
    }

    &:last-child {
      display: flex;
      justify-content: center;
      border-bottom: none !important;
      padding-top: 16px !important;
      &::before { display: none; }
    }
  }
`;

const Tr = styled.tr`
  &:hover td {
    background: #F8F9FC;
  }
`;

const BranchBadge = styled.div`
  background: ${props => props.$bg || '#EFF8FF'};
  color: ${props => props.$color || '#0052FF'};
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  display: inline-block;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #475467;
  margin-top: 4px;
  
  svg {
    width: 14px;
    height: 14px;
    color: ${props => props.$color || 'var(--text-muted)'};
  }

  .val {
     font-weight: 500;
     color: var(--text-main);
  }
`;

const AddressCard = styled.div`
  display: flex;
  gap: 10px;
  max-width: 250px;
  
  svg {
    flex-shrink: 0;
    color: #0052FF;
    margin-top: 2px;
  }

  span {
    font-size: 12px;
    line-height: 1.5;
    color: #475467;
    font-weight: 500;
  }
`;

const NodalOfficerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: #F9F5FF;
  border: 1px solid #E9D7FE;
  border-radius: 10px;
  width: fit-content;

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #7F56D9;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
  }

  .name-area {
     .name {
       font-size: 13px;
       font-weight: 600;
       color: #6941C6;
     }
     .role {
       font-size: 10px;
       color: #7F56D9;
       font-weight: 600;
       text-transform: uppercase;
     }
  }
`;

const Empty = styled.div`
  padding: 60px;
  text-align: center;
  color: var(--text-muted);
  font-size: 15px;
  background: white;
  border-radius: 16px;
  border: 1px dashed var(--border);
  margin-top: 20px;
`;

const ActionBtn = styled.button`
  background: white;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);

  &:hover {
    background: #FEF3F2;
    color: #D92D20;
    border-color: #FECDCA;
    transform: scale(1.05);
  }

  &.edit:hover {
    background: #EFF8FF;
    color: #0052FF;
    border-color: #D1E0FF;
  }

  &.status:hover {
    background: ${props => props.$active ? '#FFF1F0' : '#ECFDF3'};
    color: ${props => props.$active ? '#D92D20' : '#027A48'};
    border-color: ${props => props.$active ? '#FECDCA' : '#D1FADF'};
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => props.$active ? '#ECFDF3' : '#F2F4F7'};
  color: ${props => props.$active ? '#027A48' : 'var(--text-secondary)'};
  border: 1px solid ${props => props.$active ? '#ABEFC6' : 'var(--border)'};
  margin-left: 8px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.$active ? '#12B76A' : 'var(--text-muted)'};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--border);
  background: white;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

const PageInfo = styled.span`
  font-size: 13px;
  color: var(--text-muted);
`;

const PaginationButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f9fafb;
    border-color: var(--border);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BranchList = ({ branches = [], onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  if (!branches.length) {
    return (
      <Empty>
        <div style={{ marginBottom: 12 }}><ShieldCheck size={48} color="var(--border)" /></div>
        <p>No branches found. Get started by creating your first branch.</p>
      </Empty>
    );
  }

  const totalPages = Math.ceil(branches.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentBranches = branches.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th>Branch Details</Th>
            <Th>Contact Information</Th>
            <Th>Physical Address</Th>
            <Th>Nodal Officer</Th>
            <Th style={{ textAlign: 'right' }}>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {currentBranches.map((b) => (
            <Tr key={b.id}>
              <Td data-label="Branch Details">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <BranchBadge $bg="#EFF8FF" $color="#0052FF">{b.branchName}</BranchBadge>
                   <StatusBadge $active={b.isActive !== false}>
                     {b.isActive !== false ? 'Active' : 'Inactive'}
                   </StatusBadge>
                </div>
                <InfoRow style={{ marginTop: 8 }} $color="var(--primary)">
                   <ShieldCheck size={14} />
                   <span className="val">{b.companyName}</span>
                </InfoRow>
              </Td>
              <Td data-label="Contact">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                   <InfoRow $color="#0052FF"><Phone /><span className="val">{b.contactNumber}</span></InfoRow>
                   <InfoRow $color="#0052FF" style={{ marginTop: 8 }}><Mail /><span className="val">{b.email}</span></InfoRow>
                </div>
              </Td>
              <Td data-label="Address">
                <AddressCard>
                   <MapPin size={16} />
                   <span>{b.address}</span>
                </AddressCard>
              </Td>
              <Td data-label="Nodal Officer">
                <NodalOfficerCard>
                  <div className="avatar">{b.nodalOfficerName?.charAt(0).toUpperCase()}</div>
                  <div className="name-area">
                      <div className="name">{b.nodalOfficerName}</div>
                      <div className="role">Primary Officer</div>
                  </div>
                </NodalOfficerCard>
              </Td>
              <Td>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                   <ActionBtn className="edit" onClick={() => onEdit(b)} title="Edit Branch">
                     <Edit2 size={18} />
                   </ActionBtn>
                   <ActionBtn onClick={() => onDelete(b.id)} title="Delete Branch">
                    <Trash2 size={18} />
                  </ActionBtn>
                </div>
              </Td>
            </Tr>
          ))}
        </tbody>
      </StyledTable>

      {branches.length > 0 && (
        <PaginationContainer>
          <PageInfo>
            Showing {startIndex + 1} to {Math.min(startIndex + PAGE_SIZE, branches.length)} of {branches.length} branches
          </PageInfo>
          <PaginationButtons>
            <PageButton
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </PageButton>
            <PageButton
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </PageButton>
          </PaginationButtons>
        </PaginationContainer>
      )}
    </TableWrapper>
  );
};

export default BranchList;
