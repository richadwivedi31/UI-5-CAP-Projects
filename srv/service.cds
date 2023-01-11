using { my.assignment2 as my } from '../db/schema';

service ProductService {

    entity Products as projection on my.Products;

}