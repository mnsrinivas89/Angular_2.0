import {Component} from 'angular2/core';
import {Header} from './header'
import {Content} from './content'
import {Footer} from './footer'

@Component({
    selector: 'my-app',
    template: '<Header></Header><Content></Content><Footer></Footer>',
	directives : [Header, Content, Footer]
})
export class PhotoCollage implements OnInit {
	/**
		Inititalisation phase of the content class
	**/
	ngOnInit() {
		
	}
}
