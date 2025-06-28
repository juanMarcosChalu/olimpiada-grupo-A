import React, {useRef,useState,useEffect} from "react";
import styles from "../../../styles/perfil.module.css";
import useImageURL from '../../../hooks/useBlobToImage.js';
import { useAuth } from "../../../hooks/useAuth.js";
function Perfil() {
    const [image,setImage] = useState(null);
  const { usuario, cargando, error, isLogin } = useAuth();
  const imageurl =(useImageURL(usuario.imagen, usuario.tipodeimagen));
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí puedes manejar la carga o vista previa
      setImage(file.LastModified);
      console.log(file.path);
      
      console.log("Imagen seleccionada:", file);
    }
  };
  
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
            <h2 id="titulo-perfil">{usuario.nombre}</h2>
            <p>{usuario.email}</p>
          </div>
          <div className={styles.headerButtonContainer}>
            <button className={styles.editBtn} onClick={buttonEditing} aria-label="Editar perfil">Editar</button>
          </div>

        </div>
        <section className={isEditing ? styles.formulario : styles.desactivo} aria-labelledby="formulario-datos">
          <h3 id="formulario-datos">Datos personales</h3>

          <form>
            <div className={styles.row}>
              <div>
                <label htmlFor="nombres">Nombres</label>
                <input id="nombres" name="nombres" className={styles.input} type="text" />
              </div>
              <div>
                <label htmlFor="apellidos">Apellidos</label>
                <input id="apellidos" name="apellidos" className={styles.input} type="text" />
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
                <input type="text" className={styles.input} placeholder="Día" name="dia" />
                <input type="text" className={styles.input} placeholder="Mes" name="mes" />
                <input type="text" className={styles.input} placeholder="Año" name="anio" />
              </fieldset>

              <fieldset className={styles.genero}>
                <legend>Género</legend>
                <label><input type="radio" name="genero" value="femenino" /> Femenino</label>
                <label className={styles.rightLabel}><input type="radio" name="genero" value="masculino" /> Masculino</label>
              </fieldset>
            </div>
          </form>
        </section>
        <div className={styles.infoBox}>
          <article className={styles.infoItem}>
            <span className="material-symbols-outlined">person</span>
            <div>
              <h3>Datos Personales</h3>
              <p>Martina Gutierrez</p>
            </div>
          </article>

          <article className={styles.infoItem}>
            <span className="material-symbols-outlined">call</span>
            <div>
              <h3>Teléfonos</h3>
              <p>2281 393902</p>
            </div>
          </article>

          <article className={styles.infoItem}>
            <span className="material-symbols-outlined">mail</span>
            <div>
              <h3>Email</h3>
              <p>martinagutinf1@gmail.com</p>
            </div>
          </article>
        </div>
      </div>

      {/* Resumen de contacto */}


      {/* Formulario de edición de datos */}

    </section>
  );
}

export default Perfil;
