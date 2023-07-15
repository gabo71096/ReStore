import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, AlertTitle, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
    setError,
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          agent.Account.register(data)
            .then(() => {
              toast.success("Registration successful - you can now login");
              navigate("/login");
            })
            .catch((error) => handleApiErrors(error))
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          autoComplete="username"
          autoFocus
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message as string}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          autoComplete="email"
          {...register("email", {
            pattern: {
              value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: "Not a valid email address",
            },
            required: "Email is required",
          })}
          error={!!errors.email}
          helperText={errors.email?.message as string}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            pattern: {
              value:
                /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
              message:
                "Password requires 1 capital letter, 1 small-case letter, 1 digit, 1 special character and 6-10 characters long",
            },
            required: "Password is required",
          })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isValid}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login">Already have an account? Log in</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
