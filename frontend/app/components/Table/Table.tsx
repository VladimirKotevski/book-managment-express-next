"use client";

import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  SxProps,
  Theme,
} from '@mui/material';
import Link from 'next/link';
import styles from './table.module.scss';

interface Column<T> {
  label: string;
  accessor: keyof T;
}

interface TableComponent<T extends { _id: string }> {
  data: T[];
  columns: Column<T>[];
  editLink: string;
  onDelete: (id: string) => void;
}

const TableComponent = <T extends { _id: string }>({ data, columns, editLink, onDelete }: TableComponent<T>) => {

  const tableHeadSx: SxProps<Theme> = {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  };

  const tableCellSx: SxProps<Theme> = {
    borderBottom: 'none',
  };

  return (
    <div className={styles.tableContainer}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={tableHeadSx}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.accessor)} sx={tableCellSx}
                >{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={String(column.accessor)}>
                    {row[column.accessor] as string}
                  </TableCell>
                ))}
                <TableCell sx={{textAlign: 'end'}}>
                  <Link legacyBehavior href={`${editLink}/${row._id}`} passHref>
                    <a>Edit</a>
                  </Link>
                </TableCell>
                <TableCell sx={{textAlign: 'end'}}>
                  <button className={styles.deleteButton} onClick={() => onDelete(row._id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
