"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing : true ,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel : getPaginationRowModel(),
    getSortedRowModel : getSortedRowModel(),
    onSortingChange :setSorting,
    getFilteredRowModel : getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters ,
    initialState : {
      pagination : {
        pageSize : 5
      }
    },
    state : {
      sorting,
      columnFilters
    },
  })

  const email = table.getColumn('email');

  return (
    <section className="space-y-5  mx-auto">
    
        {/* search function */}
        <div  className="max-w-sm" >
          <Input className="w-[200px] p-3  text-sm"
            placeholder="Search by Email "
            value={email?.getFilterValue() as string || ""  }
            onChange={ (e) => email?.setFilterValue(e.target.value)}
          />
        </div>
  
        {/* table */}
        <div className="rounded-xl  shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-clip border-[1px] border-slate-100">
          <Table className="rounded-xl">
          
            <TableHeader className="bg-zinc-200 " >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow 
                    key={headerGroup.id}
                    className="border-b-2 border-none hover:bg-transparent bg-zinc-200 h-[60px]"
                  >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead 
                          key={header.id}
                        className="font-bold text-sm text-black"
                        >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
          
            <TableBody className="border-none ">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map( (row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="text-sm text-black/70 font-medium cursor-pointer hover:bg-black/5 border-b-slate-200 border-b-[1px] "
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ) )
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          
          </Table>
        </div>
        
        {/* pagination */}
        <div className="flex items-center justify-end space-x-5 py-4" >
            <Button variant="ghost" size="sm" 
              onClick={() => table.previousPage()} 
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="ghost" size="sm" 
              onClick={() => table.nextPage()} 
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
        </div>

    </section>
  )
}
