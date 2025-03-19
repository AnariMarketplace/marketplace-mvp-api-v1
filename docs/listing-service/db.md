```mermaid
erDiagram
Listings {
uuid id
string title
string purchaseType(BUY__RENT)
string sellerId(FK-[Sellers][id])
float price
}
```
