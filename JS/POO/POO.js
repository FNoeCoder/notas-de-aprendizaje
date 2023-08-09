// Creamos una clase
class Libro{
    // Se crea un constructor, que se utiliza para inicializar las propiedades que se quieren ingresar
    constructor(codigo,nombre, autor, precio){
        // Para usar encapsulamiento en js se usa el _ o # al principio de la variable
        // El _ solo es por así decirlo de manera visual
        // el # aún no es completamente conpatible con navegadores y entornos (al menos en mi caso).
        this.codigo = codigo
        this.nombre = nombre;
        this.autor = autor;
        this.precio = precio;
    }
    // Funciones get y set
    // Las funciones get retornar algo
    // Las funciones set modifican algo
    getTodo(){
        return this
    }
}

// Hacer una clase con erencia
class Comic extends Libro{
    constructor(codigo,nombre, autor, precio,ilustradores){
        super(codigo,nombre, autor, precio);

        this.ilustradores = ilustradores
    }
    agregarIlustrador(ilustrador){
        this.ilustradores.push(ilustrador)
    }
}

// Usar polimofirmismo
class CarritoCompras{
    constructor(){
        this.productos = [];
        this.totalCarrito = 0;
    }
    _detectarProductoEnCarrito(codigo, productos){
        return productos.some(producto =>{
            return producto.codigo === codigo
        })
    }
    agregarProductos(producto, cantidad){
        // Aquí se usa polimorfismo porque tratamos y usamos objetos de otras clases dentro de otras
        // el atributo producto puede ser tanto un objeto de tipo Libro o Comic

        if (!this._detectarProductoEnCarrito(producto.codigo, this.productos)){
            this.productos.push({
                codigo: producto.codigo,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad,
                totalDelProducto: producto.precio * cantidad
            })
        }else{
            this.productos.forEach((producoExistente, index) =>{
                if (producoExistente.codigo === producto.codigo){
                    console.log(`${this.productos[index].cantidad} += ${producto.cantidad}`);
                    this.productos[index].cantidad += cantidad
                }
            })
        }

        this._ponerTotalCarrito()
    }
    _ponerTotalCarrito(){
        this.totalCarrito = this.productos.map(producto => 
                {return producto.totalDelProducto}
            )
            .reduce((acumulador, valorActual) => {
                return acumulador+valorActual
            })
    }
    mostrarProductos(){
        return this.productos;
    }
    getTodo(){
        return this
    }
}

// Instanciar un objeto
let libro1 = new Libro("1001000001","Los ojos de plata", "Scott Cawthon", 307);
let comic1 = new Comic("1001000002","Amazing Fantasy #15", "Stan Lee", 40, ["Steve Ditko"]);



let carrito = new CarritoCompras();
carrito.agregarProductos(comic1, 2)
carrito.agregarProductos(libro1, 5)
carrito.agregarProductos(comic1, 2)

// console.log(carrito.mostrarProductos());
console.log(carrito.getTodo());



