Las dimensiones de las tarjeta son las que guían la composicion. Estas están modeladas con un contenedor para poder representar el anverso y el reverso.

La dimesión del contenedor es tomada de las dimensiones
de las tarjetas (anverso y reverso).

Pero la dimensión del visor (donde se muestran todas las tarjetas debe establecerse, pues las tarjetas son posicionadas con valor absolute para simular el cambio de tarjeta. Este mecanismo libera el espacio de la tarjeta, por lo que el visor queda con contenido vacío en el momento en que se reubica el elemento.

El posicionamiento absoluto reubica los elementos sin conservar el espacio. Si la dimensión del contenedor se calcula vía la dimensión de su continente, al liberar (position: absolute) el el continente resulta en un contenedor vacío.
