var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('it should generate correct message object', () =>{

        var from = 'riya';
        var text = 'some message';
        var message = generateMessage(from, text);
        expect(message.createdAt).toBe('number');
        // expect(message).toInclude({from, text}) 
    });
});