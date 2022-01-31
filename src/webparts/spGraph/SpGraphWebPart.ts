import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import SpGraph from './components/SpGraph';

export interface ISpGraphWebPartProps {
  description: string;
}

export default class SpGraphWebPart extends BaseClientSideWebPart<ISpGraphWebPartProps> {

  public render(): void {

    const element: React.ReactElement = React.createElement(SpGraph, { context:this.context } );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
