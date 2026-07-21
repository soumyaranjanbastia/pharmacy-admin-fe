import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserRow from "./UserRow";

const TableContainer = styled.div`
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  overflow: hidden;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  padding: 20px 24px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border);
  color: var(--text-main);

  @media (max-width: 600px) {
    padding: 16px;
    font-size: 15px;
  }

  &:before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ color }) => color || "#0052FF"};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;

  @media (max-width: 768px) {
    min-width: unset;
    display: block;

    tbody {
      display: block;
    }
  }
`;

const Head = styled.thead`
  background: #F9FAFB;
  text-align: left;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderCell = styled.th`
  padding: 12px 24px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  border-bottom: 1px solid var(--border);
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid var(--border);

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

const UserTable = ({ title, color, users = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [users, title]);

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentUsers = users.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <TableContainer>
      <Title color={color}>
        {title} ({users.length})
      </Title>
      <div style={{
        overflowX: 'auto',
        width: '100%',
        WebkitOverflowScrolling: 'touch'
      }}>
        <style>
          {`
            div::-webkit-scrollbar { height: 6px; }
            div::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
          `}
        </style>
        <Table>
          <Head>
            <tr>
              <HeaderCell>User Name</HeaderCell>
              <HeaderCell>Role</HeaderCell>
              <HeaderCell>Branch</HeaderCell>
              <HeaderCell>Company</HeaderCell>
              <HeaderCell>Created By</HeaderCell>
              <HeaderCell>DOB</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Token</HeaderCell>
              <HeaderCell style={{ textAlign: 'center' }}>Actions</HeaderCell>
            </tr>
          </Head>
          <tbody>
            {(currentUsers && currentUsers.length > 0) ? (
              currentUsers.map((user, i) => <UserRow key={startIndex + i} user={user} />)
            ) : (
              <tr>
                <td colSpan="9" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No users found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {users.length > 0 && (
        <PaginationContainer>
          <PageInfo>
            Showing {startIndex + 1} to {Math.min(startIndex + PAGE_SIZE, users.length)} of {users.length} staff
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
    </TableContainer>
  );
};

export default UserTable;
