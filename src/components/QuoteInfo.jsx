import React from 'react';

import {
  Box,
  Typography,
  TextField,
  Stack,
  Autocomplete,
} from '@mui/material';

const QuoteInfo = ({
  cliente,
  onChange,
  clientesEncontrados = [],
  onBuscarCliente,
}) => {

  const handleFieldChange = (field, value) => {

    onChange({
      ...cliente,
      [field]: value,
    });
  };

  const handleSelectCliente = (_, value) => {

    if (!value) {

      onChange({
        idCliente: null,
        nombres: '',
        apellidos: '',
        telefono: '',
        correoElectronico: '',
        direccion: '',
        tipoCliente: '',
      });

      return;
    }

    onChange({
      idCliente: value.idCliente,

      nombres: value.nombres || '',
      apellidos: value.apellidos || '',

      telefono: value.telefono || '',

      correoElectronico:
        value.correoElectronico || '',

      direccion: value.direccion || '',

      tipoCliente: value.tipoCliente || '',
    });
  };

  const bloqueado = !!cliente.idCliente;

  return (

    <Box sx={{ mb: 4, textAlign: 'left' }}>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: '16px'
        }}
      >
        Información de cotización
      </Typography>

      <Typography
        variant="caption"
        color="textSecondary"
        sx={{
          mb: 2,
          display: 'block'
        }}
      >
        Ingresa la información requerida
      </Typography>

      <Typography
        sx={{
          fontWeight: 600,
          mt: 3,
          mb: 1
        }}
      >
        Cliente
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2 }}
      >

        <Autocomplete
          fullWidth
          freeSolo
          options={clientesEncontrados}
          value={null}
          inputValue={cliente.nombres || ''}
          onInputChange={(_, value) => {

            handleFieldChange('nombres', value);

            onBuscarCliente(value);
          }}
          onChange={handleSelectCliente}
          getOptionLabel={(option) => {

            if (typeof option === 'string') {
              return option;
            }

            return `${option.nombres || ''} ${option.apellidos || ''}`;
          }}
          renderOption={(props, option) => (
            <li {...props}>
              <Box>

                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  {option.nombres} {option.apellidos}
                </Typography>

                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: '#777'
                  }}
                >
                  {option.telefono}
                </Typography>

              </Box>
            </li>
          )}
          renderInput={(params) => (

            <TextField
              {...params}
              label="Nombre"
              placeholder="Juan"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />

          )}
        />

        <TextField
          fullWidth
          label="Apellido"
          value={cliente.apellidos}
          disabled={bloqueado}
          onChange={(e) =>
            handleFieldChange(
              'apellidos',
              e.target.value
            )
          }
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px'
            }
          }}
        />

      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 2 }}
      >

        <TextField
          fullWidth
          label="Teléfono"
          value={cliente.telefono}
          disabled={bloqueado}
          onChange={(e) =>
            handleFieldChange(
              'telefono',
              e.target.value
            )
          }
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px'
            }
          }}
        />

        <TextField
          fullWidth
          label="Correo electrónico"
          value={cliente.correoElectronico}
          disabled={bloqueado}
          onChange={(e) =>
            handleFieldChange(
              'correoElectronico',
              e.target.value
            )
          }
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px'
            }
          }}
        />

      </Stack>

      <Stack
        direction="row"
        spacing={2}
      >

        <TextField
          fullWidth
          label="Dirección"
          value={cliente.direccion}
          disabled={bloqueado}
          onChange={(e) =>
            handleFieldChange(
              'direccion',
              e.target.value
            )
          }
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px'
            }
          }}
        />

        <TextField
          fullWidth
          label="Tipo cliente"
          value={cliente.tipoCliente}
          disabled={bloqueado}
          onChange={(e) =>
            handleFieldChange(
              'tipoCliente',
              e.target.value
            )
          }
          variant="outlined"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px'
            }
          }}
        />

      </Stack>

    </Box>
  );
};

export default QuoteInfo;