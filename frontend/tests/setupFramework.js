import * as Enzyme from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

