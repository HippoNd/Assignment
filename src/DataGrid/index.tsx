import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridColumns
} from "@mui/x-data-grid";

interface IDataGridProps extends DataGridProps {
  loading?: boolean;
  rows: any[];
  columns: GridColDef[] | GridColumns;
  noResultsLabel?: string;
  noRowsLabel?: string;
  isFilter?: boolean;
}

const DataGridCommon = (props: IDataGridProps) => {
  const {
    loading = false,
    rows,
    columns,
    noResultsLabel = "Không có dữ liệu",
    noRowsLabel = "Không có dữ liệu",
    isFilter,
    ...rest
  } = props;
  const rowsPerPageOptions = [5, 10, 25, 50, 100];
  return (
    <StyledDataGrid
      loading={loading}
      rows={rows}
      columns={columns}
      rowsPerPageOptions={rowsPerPageOptions}
      disableColumnMenu
      pagination
      checkboxSelection
      disableSelectionOnClick
      components={{
        NoRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            {isFilter && !loading && rows.length === 0
              ? "Không tồn tại kết quả tìm kiếm"
              : noRowsLabel}
          </Stack>
        ),
        NoResultsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            {isFilter && !loading && rows.length === 0
              ? "Không tồn tại kết quả tìm kiếm"
              : noResultsLabel}
          </Stack>
        ),
        ErrorOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            Đã có lỗi xảy ra
          </Stack>
        ),
      }}
      localeText={{
        footerRowSelected: (count) => `${count} dòng được chọn`,
      }}
      {...rest}
    />
  );
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& ::-webkit-scrollbar": {
    backgroundColor: "#FFF",
    width: "16px",
  },

  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#FFF",
  },

  "& ::-webkit-scrollbar-track:hover": {
    backgroundColor: "#F4F4F4",
  },

  "& ::-webkit-scrollbar-thumb": {
    backgroundColor: "#808080",
    borderRadius: "16px",
    border: "5px solid #FFF",
  },

  "& ::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#808080",
    border: "4px solid #F4F4F4",
  },

  "& ::-webkit-scrollbar-button": { display: "none" },
}));

export default DataGridCommon;
