import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,} from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

//estado inicial pra setar o estado do componente
const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}
export default class App extends Component {
  state = { ...initialState }

//o ponto só pode entrar uma única vez. Se ao inserir um ponto, o displayValue já possui outro ponto inserido, o segundo ponto é ignorado
//substitui o zero pelo dígito que eu inserir ou quando a variável for verdadeira
  addDigit = n => { 
  
    const clearDisplay = this.state.displayValue === '0' 
      || this.state.clearDisplay

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) {
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue   //se o valor corrente = ao clearDisplay = é vazio, senão vai ser o valor que está no display
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })   //valor corrente mais o número que foi digitado

    //mudar o values a partir do array
    if (n !== '.') {  //quer dizer que vc digitou um dígito válido
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values] //criei um array clonado
      values[this.state.current] = newValue //setei um novo valor dentro do array
      this.setState({ values }) //alterei o estado
    }
  }
 
  //restaurar o estado inicial
  clearMemory = () => { 
    this.setState({ ...initialState })
  }

  //seta operação que eu marquei e limpa o display para receber o próximo dígito
  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] =
        eval(`${values[0]} ${this.state.operation} ${values[1]}`)  //eval: pego o valor 1, do operation e o valor 2, avalio e dou o resultado   //`` template string: pra interpolar as variáveis
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        // clearDisplay: !equals,
        values,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
          <View style={styles.buttons}>
            <Button label='AC' triple onClick={this.clearMemory} />
            <Button label='/' operation onClick={ this.setOperation} />
            <Button label='7' onClick={ this.addDigit} />
            <Button label='8' onClick={ this.addDigit} />
            <Button label='9' onClick={ this.addDigit} />
            <Button label='*' operation onClick={ this.setOperation} />
            <Button label='4' onClick={ this.addDigit} />
            <Button label='5' onClick={ this.addDigit} />
            <Button label='6' onClick={ this.addDigit} />
            <Button label='-' operation onClick={ this.setOperation} />
            <Button label='1' onClick={ this.addDigit} />
            <Button label='2' onClick={ this.addDigit} />
            <Button label='3' onClick={ this.addDigit} />
            <Button label='+' operation onClick={ this.setOperation} />
            <Button label='0' double onClick={ this.addDigit} />
            <Button label='.' onClick={ this.addDigit} />
            <Button label='=' operation onClick={ this.setOperation} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
