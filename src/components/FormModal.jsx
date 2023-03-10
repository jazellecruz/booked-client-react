import { useState, useContext } from "react";
import axios from "axios";
import { Modal,
         Box, 
         ThemeProvider, 
         Button,
         Alert,
         Snackbar } from "@mui/material"
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import {addBookTheme, modalStyle} from "../styles/themes/themes"
import { CategoriesContext } from "../contexts/context";
import { sanitizeInput } from "../helpers/helpers"

function FormModal() {
  const [openBookForm, setOpenBookForm] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [entry, setEntry] = useState({
    title: null,
    author: null,
    description: null,
    category_id: null,
    status_id: null
  });
  const [error, setError] = useState({});
  const categoriesList = useContext(CategoriesContext);

  const emptyEntry = () => {
    setEntry({
      title: null,
      author: null,
      description: null,
      category_id: null,
      status_id: null
    })
  }

  const handleCancel = () => {
    emptyEntry();
    handleCloseBookFormClick();
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setEntry({
      ...entry,
      [name] : sanitizeInput(value, name)
    })
    console.log(entry)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: "http://localhost:8000/library/books",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        "x-access-token": localStorage.getItem("accessToken")
      },
      data: {
        title: entry.title,
        author: entry.author,
        description: entry.description,
        category_id: entry.category_id,
        status_id: entry.status_id
      }
    })
    .then(res => {
      if(res.status === 200) {
        console.log(res)
        handleCancel();
        setOpenSuccessSnackbar(true)
      }
    })
    .catch(err => {
      setError({...err.response})
      handleCancel();
      setOpenErrorSnackbar(true)
    })
  }


  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "http://localhost:8000/library/categories",
  //     headers: {
  //       "x-access-token": localStorage.getItem("accessToken")
  //     }
  //   })
  //   .then(res => {
  //     setCategoriesList([...res.data])
  //   })
  // }, []);

  const handleOpenBookFormClick = () => {
    setOpenBookForm(!openBookForm)
  }

  const handleCloseBookFormClick = () => {
    setOpenBookForm(!openBookForm)
  }

  
  return(
    <>
    <ThemeProvider theme={addBookTheme}>
    <Button onClick={handleOpenBookFormClick} variant="contained" startIcon={<ControlPointRoundedIcon />}>
      Add a book
    </Button>
  </ThemeProvider>
  <Modal 
  open={openBookForm}
  onClose={handleCloseBookFormClick} >
    <Box sx={modalStyle}>
    <form onSubmit={handleSubmit}>
        <label for="title">Title:</label>
        <input type="text" value={entry.title} onChange={(e) => handleChange(e)} name="title"></input>
        <br></br>
        <label for="author">Author:</label>
        <input type="text"  value={entry.author} onChange={(e)=> handleChange(e)} name="author"></input>
        <br></br>
        <label for="description">Description:</label>
        <input type="text" value={entry.description}  onChange={(e)=> handleChange(e)} name="description"></input>
        <br></br>
        <label for="category_id">Category</label>
        <select name="category_id" value={entry.category_id} onChange={(e)=> handleChange(e)} >
        <option value="" disabled selected>Select a category</option>
        <CategoriesContext.Consumer >
        {categoriesList => 
          categoriesList.map(({ category, category_id}) =>
           <option value={category_id}>{category}</option>
          )
        }
        </CategoriesContext.Consumer>
        </select>
        <br></br>
        <label for="status_id">Status</label>
        <select name="status_id" placeholder="status" onChange={(e)=> handleChange(e)} value={entry.status_id}>
          <option value="" disabled selected>Select a status</option>
          <option value="1">Finished</option>
        </select>
        <br></br>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </Box>
  </Modal>
    <Snackbar open={openSuccessSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} variant="filled" severity="success" sx={{ width: '100%' }}>
          Successfully saved!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} variant="filled" severity="error" sx={{ width: '100%' }}>
          {`Request failed! Try again later. (Error ${error.status})`}
        </Alert>
      </Snackbar>
  </>
  );
}

export default FormModal;