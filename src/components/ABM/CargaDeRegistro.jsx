import axios from "axios";

const CargaDeRegistro = ({registro}) => {
    const [nuevoRegistro, setNuevoRegistro] = useState({});
    let registroStatus=false;
    const handleInputChange = (event) => {
        if(registroStatus==false){
            registro!=null&&(setNuevoRegistro(registro),
            registroStatus=true);
        }

      const { name, value } = event.target;
      setNuevoRegistro((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if(registro==null){
        axios.post('http://localhost:5173/api/v1/rubros-articulos/simple-save',nuevoRegistro);
      }else{
        axios.put('http://localhost:5173/api/v1/rubros-articulos/' + registro.id);
      }
  
  
  return (
    
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="campo1"
          value={nuevoRegistro.campo1 || ''}
          onChange={handleInputChange}
        />
    
        <button type="submit">Guardar registro</button>
      </form>
    </div>
  );
};
export default CargaDeRegistro;
