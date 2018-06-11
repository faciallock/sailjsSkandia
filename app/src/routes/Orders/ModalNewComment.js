import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {
    Form, Radio, Input, Button, Modal, Select, DatePicker, LocaleProvider 
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const ModalNewComment = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            const { TextArea } = Input;

            return (
                <LocaleProvider locale={en_US}>
                <Modal
                    visible={visible}
                    title="New comment"
                    okText="Create"
                    cancelText="Cancel"
                    onCancel={this.props.onCancel}
                    onOk={this.props.onCreate}
                >
                        
                 <Form layout="vertical">
                        <FormItem label="Comments">
                            {getFieldDecorator('comments', {
                                rules: [{ required: true, message: 'Please add your comments.' }],
                            })(
                                <TextArea rows={4} />
                            )}
                        </FormItem>
                </Form>
                </Modal>
                </LocaleProvider>
            );
        }
    }
);
export default ModalNewComment;