'use client'

import React from 'react'
import { useRouter } from 'next/router'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { green, purple } from '@mui/material/colors'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import validator from 'email-validator'

export default function Page () {


  async function runDBCallAsync (url) {
    const res = await fetch(url)
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const data = await res.json()
      if (data.data === "true") {
        console.log("registered")
        window.location.href = '/dashboard'
      } else {
        console.log("not registered")
        // Handle not registered case
      }
    } else {
      console.error('Error fetching data:', res.statusText)
    }
  }

  const validateForm = (event) => {
    let errorMessage = ''
    const data = new FormData(event.currentTarget)
    let email = data.get('email')

    if (!validator.validate(email)) {
      errorMessage += 'Incorrect email'
    }
    return errorMessage
  }

  /*

  When the button is clicked, this is the event that is fired.
  The first thing we need to do is prevent the default refresh of the page.
  */
  const handleSubmit = (event) => {
    console.log("handling submit")
    event.preventDefault()

    let errorMessage = validateForm(event)
    // save the mesage
    setErrorHolder(errorMessage)

    // if we have an error
    if (errorMessage.length > 0) {
      setOpen(true)
    } else {
      // if we do not get an error
      const data = new FormData(event.currentTarget)
      let email = data.get('email')
      let pass = data.get('pass')
      console.log("Sent email:" + email)
      console.log("Sent pass:" + pass)
      console.log("calling db")
      runDBCallAsync(`api/login?email=${email}&pass=${pass}`)
    }// error message if

    // Process form submission if validation is successful
    const data = new FormData(event.currentTarget)
    let email = data.get('email')
    let pass = data.get('pass')
    let address = data.get('address')
    let tell = data.get('tell')
    let dob = data.get('dob')

    console.log("Sent email:" + email)
    console.log("Sent pass:" + pass)
    console.log("Sent address:" + address)
    console.log("Sent tell:" + tell)
    console.log("Sent dob:" + dob)


    console.log("calling db")
    runDBCallAsync(`api/register?tell=${tell}&email=${email}&pass=${pass}&address=${address}&dob=${dob}`)
  } // end handler






  const theme = createTheme({
    palette: {

      secondary: {
        main: green[500],
      },
    },
  })


  // first
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  // second
  const [errorHolder, setErrorHolder] = React.useState(false)


  return (
    <ThemeProvider theme={theme}>

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Error"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errorHolder}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

          </Avatar>
          <Typography component="h1" variant="h5">
            Register now
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Pass"
              type="pass"
              id="pass"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="tell"
              label="Tellphone"
              type="tell"
              id="tell"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="dob"
              label="dob"
              type="text"
              id="dob"
              autoComplete=""
            />


            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register me now
            </Button>




            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>

    </ThemeProvider>

  )
}