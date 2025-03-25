```mermaid
erDiagram
Listings {
uuid id
string title
string type(BUY__RENT)
string sellerId(FK-[Sellers][id])
float price
text description
text[] photo_urls
text condition(NEW__GREAT__GOOD__FAIR)
json specs
int availableQty
text category
text subCategory
bool priceNegotiable
bool isFragile
}
```

```mermaid
erDiagram
Indexes {
string title
string purchaseType(BUY__RENT)
string sellerId
}
```
