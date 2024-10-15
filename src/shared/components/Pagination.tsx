'use client';

import { Button } from '@/shared/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <Button variant="outline" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Anterior
      </Button>
      <span className="text-sm">
        Página {currentPage} de {totalPages}
      </span>
      <Button variant="outline" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Siguiente
      </Button>
    </div>
  );
}
