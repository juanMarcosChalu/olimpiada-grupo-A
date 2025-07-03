import React, { useRef, useState, useEffect } from "react";
import styles from "../../../styles/perfil.module.css";
import useImageURL from '../../../hooks/useBlobToImage.js';
import { useAuth } from "../../../hooks/useAuth.js";
import { toast } from "sonner";
import { use } from "react";
function Perfil() {
  const { usuario, cargando, error, isLogin,refetch  } = useAuth();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || "");
      setApellido(usuario.apellido || "");
      setDia(usuario.diaNacimiento || "");
      setMes(usuario.mesNacimiento || "");
      setAno(usuario.anoNacimiento || "");
      setGenero(usuario.genero || "");
    }
  }, [usuario,useAuth]);

  
  const imageurl = (useImageURL(usuario.imagen, usuario.tipodeimagen));
  useEffect(() => {
    if (imageurl) {
      setImage(imageurl);
    }
  }, [imageurl]);




  const [isEditing, setIsEditing] = React.useState(false);
  function buttonEditing() {
    setIsEditing(!isEditing);
  }



  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleUserForm = async (e) => {
  e.preventDefault();

  if (!nombre || !apellido || !dia || !mes || !ano || !genero) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const birthday = `${ano.padStart(4, "0")}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("apellido", apellido);
  formData.append("genero", genero);
  formData.append("birthday", birthday);

  if (fileInputRef.current && fileInputRef.current.files[0]) {
    formData.append("imagen", fileInputRef.current.files[0]);
  }

  try {
      const respuesta = await fetch(`https://4479f971-1d51-4b67-938a-a80b7de0af34-00-3inmgxot9m6r9.picard.replit.dev/usuario/update/${usuario.id}`, {
      method: "PATCH",
      body: formData,
      credentials: `include`
    });

    if (!respuesta.ok) {
      throw new Error("Error al actualizar los datos");
    }


    toast.success("Perfil actualizado correctamente.");
     await refetch(); 
      setIsEditing(false);
      

  } catch (err) {
    console.error(err);
    toast.error("Hubo un problema al actualizar el perfil.");
  }
   
};


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  useEffect(() => {
    if (usuario?.birthday) {
      const date = new Date(usuario.birthday); // convierte a objeto Date
      const dia = String(date.getUTCDate()).padStart(2, '0'); // día (1–31)
      const mes = String(date.getUTCMonth() + 1).padStart(2, '0'); // mes (0–11, +1)
      const ano = String(date.getUTCFullYear()); // año completo

      setDia(dia);
      setMes(mes);
      setAno(ano);
    }
  }, [usuario]);



  return (
    <section className={styles.perfilContainer} aria-labelledby="titulo-perfil">
      {/* Información principal del usuario */}
      <div className={styles.headerBox}>
        <div className={styles.userInfo}>
          <div className={styles.headerImgContainer}>
            <img
              src={image}
              alt="Foto del usuario"
              className={styles.avatar}
            />
            {isEditing &&
              <div className={styles.overlay} onClick={handleEditClick}>
                ✏️
              </div>
            }
          </div>
          <div className={styles.headertext}>
            <h2 id="titulo-perfil">{usuario.nombre+" "+usuario.apellido}</h2>
            {/* <p>{usuario.email}</p> */}
          </div>
          <div className={styles.headerButtonContainer}>
            <button className={styles.editBtn} onClick={buttonEditing} aria-label="Editar perfil">Editar</button>
          </div>

        </div>
        <section className={isEditing ? styles.formulario : styles.desactivo} aria-labelledby="formulario-datos">
          <h3 id="formulario-datos">Datos personales</h3>

          <form onSubmit={handleUserForm}>
            <div className={styles.row}>
              <div>
                <label htmlFor="nombres">Nombres</label>
                <input id="nombres" name="nombres" className={styles.input} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div>
                <label htmlFor="apellidos">Apellidos</label>
                <input id="apellidos" name="apellidos" className={styles.input} type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div className={styles.row}>
              <fieldset className={styles.fecha}>
                <legend>Fecha de nacimiento</legend>
                <input type="number" className={styles.input} placeholder="Día" name="dia" min="1" max="31" value={dia} onChange={(e) => {
                  const value = e.target.value;
                  if (!value || (Number(value) >= 1 && Number(value) <= 31)) {
                    setDia(value);
                  }
                }}
                />
                <input type="number" className={styles.input} placeholder="Mes" name="mes" min="1" max="12" value={mes} onChange={(e) => {
                  const value = e.target.value;
                  if (!value || (Number(value) >= 1 && Number(value) <= 12)) {
                    setMes(value);
                  }
                }}
                />
                <input type="number" className={styles.input} placeholder="Año" name="anio" min="1900" max="2100" value={ano} onChange={(e) => {
                  const value = e.target.value;
                  if (!value || (Number(value) >= 0 && Number(value) <= 3000)) {
                    setAno(value);
                  }
                }}
                />
              </fieldset>

              <fieldset className={styles.genero}>
                <legend>Género</legend>
                <label>
                  <input
                    type="radio"
                    name="genero"
                    value="mujer"
                    checked={genero === "mujer"}
                    onChange={(e) => setGenero(e.target.value)}
                  />
                  Femenino
                </label>
                <label className={styles.rightLabel}>
                  <input
                    type="radio"
                    name="genero"
                    value="hombre"
                    checked={genero === "hombre"}
                    onChange={(e) => setGenero(e.target.value)}
                  />
                  Masculino
                </label>
              </fieldset>

            </div>
            <button className={styles.saveBtn} type="submit">Guardar</button>
          </form>
        </section>
        <div className={styles.infoBox}>
          <article className={styles.infoItem}>
            <span className="material-symbols-outlined">person</span>
            <div>
              <h3>Datos Personales</h3>
              <p>{usuario.nombre}</p>
            </div>
          </article>

          <article className={styles.infoItem}>
            <span className="material-symbols-outlined">call</span>
            <div>
              <h3>Teléfono</h3>
              <p>2281 393902</p>
            </div>
          </article>

          <article className={styles.infoItem}>
            <span className="material-symbols-outlined">mail</span>
            <div>
              <h3>Email</h3>
              <p>{usuario.email}</p>
            </div>
          </article>
        </div>
      </div>

    </section>
  );
}

export default Perfil;
