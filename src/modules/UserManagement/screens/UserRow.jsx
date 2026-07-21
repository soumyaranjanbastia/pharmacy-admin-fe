import React, { useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";
import StatusBadge from "./StatusBadge";
import { LuTrash2 as Trash2, LuPencil as Edit } from 'react-icons/lu';
import { useDispatch } from "react-redux";
import { deleteUserRequest } from "../actions/deleteUserActions";
import { useNavigate } from "react-router-dom";



const Cell = styled.td`
  padding: 16px 24px;
  font-size: 14px;
  vertical-align: middle;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px !important;
    border-bottom: 1px solid #f1f5f9 !important;
    gap: 12px;
    word-break: break-all;
    
    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: var(--text-muted);
      font-size: 11px;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    & > *:not(::before) {
      flex-shrink: 1;
      width: fit-content;
    }

    &.actions-cell {
      border-bottom: none !important;
      padding-top: 16px !important;
    }
  }
`;

const Row = styled.tr`
  border-bottom: 1px solid var(--border);
  transition: background-color 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 16px 0;
    border-bottom: 8px solid #f8fafc;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
  overflow: hidden;
  
  strong {
    color: var(--text-main);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  span {
    color: var(--text-muted);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 768px) {
    max-width: 75%;
    text-align: left;
    align-items: flex-start;
  }
`;

const RoleTag = styled.span`
  background: #EFF8FF;
  color: #0052FF;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #B2DDFF;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  width: fit-content;
  display: inline-block;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(16, 24, 40, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ConfirmModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  text-align: center;
  animation: scaleUp 0.2s ease-out;

  @keyframes scaleUp {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const ModalIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #FEF3F2;
  color: #D92D20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 8px 0;
`;

const ModalText = styled.p`
  font-size: 14px;
  color: #475467;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  
  button {
    flex: 1;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    outline: none;
  }

  .cancel-btn {
    background: white;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    &:hover {
      background: #F9FAFB;
    }
  }

  .confirm-btn {
    background: #D92D20;
    color: white;
    &:hover {
      background: #B42318;
    }
  }
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--text-muted);
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: #0052FF;
    }

    &.delete:hover {
      color: #D92D20;
    }
  }
`;

const UserRow = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const isSuperAdmin = user.roleName === "SUPER ADMIN";
  const canDelete = !!user.branchUserId;

  const handleDelete = () => {
    if (!user.branchUserId) {
      console.log("❌ SUPER ADMIN or missing branchUserId – not deletable");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteUserRequest({ branchUserId: user.branchUserId }));
    setShowConfirm(false);
  };

  return (
    <>
      <Row>
        <Cell data-label="User Name">
          <UserInfo>
            <strong>
              {user.firstName
                ? `${user.firstName} ${user.lastName}`
                : user.fullName || user.userName}
            </strong>
            <span>{user.email || 'no-email@example.com'}</span>
          </UserInfo>
        </Cell>
        <Cell data-label="Role">
          <RoleTag>{user.roleName}</RoleTag>
        </Cell>
        <Cell data-label="Branch" style={{ color: '#475467' }}>{user.branchName || "-"}</Cell>
        <Cell data-label="Company" style={{ color: '#475467' }}>{user.companyName || "-"}</Cell>
        <Cell data-label="Created By" style={{ color: '#475467' }}>{user.createdByName || "SYSTEM"}</Cell>
        <Cell data-label="DOB" style={{ color: '#475467' }}>{user.dob || "-"}</Cell>
        <Cell data-label="Status">
          <StatusBadge status={user.isActive || "Active"} />
        </Cell>
        <Cell data-label="Token" style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'monospace' }}>
          {user.token || "N/A"}
        </Cell>
        <Cell className="actions-cell" data-label="Actions" style={{ textAlign: 'center' }}>
          <ActionIcons style={{ justifyContent: 'center' }}>
            {!isSuperAdmin && (
              <>
                <button className="edit" onClick={() => navigate("/admin/edit-user", { state: { user } })} title="Edit User">
                  <Edit size={18} />
                </button>
                <button className="delete" onClick={handleDelete} title="Delete User">
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </ActionIcons>
        </Cell>
      </Row>

      {showConfirm && createPortal(
        <ModalOverlay onClick={() => setShowConfirm(false)}>
          <ConfirmModalBox onClick={(e) => e.stopPropagation()}>
            <ModalIcon>
              <Trash2 size={24} />
            </ModalIcon>
            <ModalTitle>Delete User</ModalTitle>
            <ModalText>
              Are you sure you want to delete user <strong>"{user.firstName ? `${user.firstName} ${user.lastName}` : user.fullName || user.userName}"</strong>? This action cannot be undone.
            </ModalText>
            <ModalButtonGroup>
              <button className="cancel-btn" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleConfirmDelete}>
                Delete
              </button>
            </ModalButtonGroup>
          </ConfirmModalBox>
        </ModalOverlay>,
        document.body
      )}
    </>
  );
};

export default UserRow;
