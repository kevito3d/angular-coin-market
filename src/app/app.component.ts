import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_24h: number;
  low_24h: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  coins: Coin[] = [];
  coinFilterView : Coin[] = [];
  titles: string[] = [
    '#',
    'Coin',
    'Price ',
    ' 24h',
    'Low 24h',
    // 'Precio ultimas 24h',
  ];
  searchText: string = '';

  coinSelected : Coin  | null =  null; 
  constructor(private http: HttpClient) {}
  handleClik (coin: Coin){
    console.log('click en ', coin);
  }

  searchCoin() {
    console.log('searching coin: ', this.searchText);
    this.coinFilterView = this.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(this.searchText.toLowerCase() )|| coin.symbol.toLowerCase().includes(this.searchText.toLowerCase() );
    }
    );

  }

  ngOnInit(): void {
    this.http
      .get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .subscribe((data) => {
        console.log(data);
        // this.coins = data;
        this.coins = data;
        this.coinFilterView = data;
      });
  }
}
