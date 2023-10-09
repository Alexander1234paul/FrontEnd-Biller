import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-verification-email',
  templateUrl: './send-verification-email.component.html',
  styleUrls: ['./send-verification-email.component.css']
})
export class SendVerificationEmailComponent implements OnInit, OnDestroy {
  minutes: number = 10;
  seconds: number = 0;
  intervalId: any;
  status: boolean = true;

  resp: string = '';
  email: string = 'correodeprueba@gmail.com';

  ngOnInit(): void {
    this.startTimer()
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      if (this.minutes === 0 && this.seconds === 0) {
        this.stopTimer();
        this.status = false;
      } else if (this.seconds === 0) {
        this.minutes--;
        this.seconds = 59;
      } else {
        this.seconds--;
      }
    }, 1000)
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  public resendMail() {

    // this.loginServices.Login(form).subscribe((data: any) => {
    //   console.log(data);
    //   if (data.status == 'Error') {
    //     this.estado = true;
    //     this.resp = data.resp;
    //   } else {
    //     this.estado = false;

    //   }
    // });
    this.minutes = 10;
    this.seconds = 0;
    this.status = true;
    this.startTimer();
  }
}
