import { Box, Button, FormGroup, Grid, TablePagination } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ControllerTextField from "./ControllerTextField";
import DataGridCommon from "./DataGrid";
import { getData } from "./service";
import { IFilter, IListData } from "./type";

const defaultValues = {
  fullName: "",
  userName: "",
};

function App() {
  const [loading, setLoading] = useState<boolean>(false); // loading when data is fetching
  const [listData, setListData] = useState<IListData[]>([]);
  const { control, handleSubmit } = useForm<IFilter>({
    mode: "onSubmit",
    defaultValues: defaultValues,
  });
  const [filter, setFilter] = useState<IListData[]>([]);
  const renderIcon = (params: any) => {
    const value = params.value;
    return (
      <Box
        component="img"
        sx={{
          height: "calc(130px + 4vw)",
          width: "calc(130px + 4vw)",
          objectFit: "cover",
          clipPath: "circle(50% at 50% 50%)",
        }}
        alt="Img"
        src={value}
      />
    );
  };
  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "userName",
      headerName: "Username",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      minWidth: 120,
      renderCell: renderIcon,
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function paginate(array: any[], page_size: number, page_number: number) {
    const newArray = [...array];
    return newArray.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
  }

  useEffect(() => {
    setLoading(true);
    getData()
      .then(function (response) {
        // handle success
        setListData(
          response.data.results.map((item: any, index: number) => ({
            id: `${item.id.name}+${index}`,
            fullName: `${item.name.title}.${item.name.first} ${item.name.last}`,
            userName: item.login.username,
            icon: item.picture.thumbnail,
          }))
        );
        setFilter(
          response.data.results.map((item: any, index: number) => ({
            id: `${item.id.name}+${index}`,
            fullName: `${item.name.title}.${item.name.first} ${item.name.last}`,
            userName: item.login.username,
            icon: item.picture.thumbnail,
          }))
        );
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        setLoading(false);
      });
  }, []);

  const onSubmit = (params: IFilter) => {
    if (params.fullName === "" && params.userName === "") {
      setFilter(listData);
    } else {
      const data = listData.filter((item) => {
        return Object.keys(params).every((key) => {
          return item[key].toLowerCase().includes(params[key].toLowerCase());
        });
      });
      setFilter(data);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ margin: "10px 0px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} lg={2}>
                <FormGroup>
                  <ControllerTextField
                    name="fullName"
                    control={control}
                    placeholder="Full Name"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={4} lg={2}>
                <FormGroup>
                  <ControllerTextField
                    name="userName"
                    control={control}
                    placeholder="Username"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={4} lg={8}>
                <Button type="submit">Filter</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGridCommon
            getRowHeight={() => "auto"}
            checkboxSelection={false}
            loading={loading}
            rows={paginate(filter, rowsPerPage, page + 1)}
            columns={columns}
            hideFooterPagination={true}
          />
          <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </header>
    </div>
  );
}

export default App;
