<script>
    import {mapState} from 'vuex'

    export default {
        name: "OperBtn",
        props: {
            btnInfo: {
                type: Array
            }
        },
        computed: {
            ...mapState({
                allAuth: ({user}) => user.allAuth
            })
        },
        render(h) {
            let btnInfo = this.btnInfo
            let props = {
                style: {
                    cursor: 'pointer',
                    paddingLeft: '0.25rem',
                    paddingRight: '0.25rem',
                }
            }
            let showToolTip = ({permission, content, className, event}) => {
                if (this.hasPermission(permission)) {
                    return (
                        <el-tooltip placement="top" content={content}>
                            <span class="text-blue-500 text-base">
                                <i {...props} class={className} onClick={() => event()}></i>
                            </span>
                        </el-tooltip>
                    )
                }
                return ''
            }

            let showPopover = ({index, popText, permission, className, event}) => {
                if (this.hasPermission(permission)) {
                    return (
                        <el-popover placement="top"
                                    width="160"
                                    ref={index}
                        >
                            <div class="pb-3 flex">
                                    <span class ="px-1 text-orange-500 font-mono">
                                        <i class ="el-icon-warning"></i>
                                    </span>
                                <slot name="popover-title">{popText}</slot>
                            </div>
                            <div class="text-right">
                                <el-button size="mini" type="text"
                                           onClick={() => this.cancel(index)}>{this.$t('common_cancel')}
                                </el-button>
                                <el-button type="primary" size="mini"
                                           onClick={() => {
                                               event(this.cancel, index)
                                           }}>{this.$t('common_confirm')}
                                </el-button>
                            </div>
                            <span class="text-blue-500 text-base" slot="reference">
                                <i {...props} class={className}></i>
                            </span>
                        </el-popover>
                    )
                }
                return ''
            }

            return (
                <div>
                    {
                        btnInfo.map(({type, dropDownItems, popover, popText, content, className, permission, event}, index) => {
                            return (
                                type === 'dropDown' ?
                                    <el-dropdown placement="bottom">
                                        <span class="text-blue-500 text-base">
                                          <i class={className}></i>
                                       </span>
                                        <el-dropdown-menu slot="dropdown">
                                            {
                                                dropDownItems.map((item, index) => {
                                                    return (
                                                        this.hasPermission(item.permission) ?
                                                            item.popover ?
                                                                <el-popover placement="top"
                                                                            width="160"
                                                                            ref={index}
                                                                >
                                                                    <div class="pb-3 flex">
                                                                <span class="px-1 text-orange-500 font-mono">
                                                                    <i class="el-icon-warning"></i>
                                                                </span>
                                                                        <slot name="popover-title">{item.popText}</slot>
                                                                    </div>
                                                                    <div class="text-right">
                                                                        <el-button size="mini" type="text"
                                                                                   onClick={() => this.cancel(index)}>{this.$t('common_cancel')}
                                                                        </el-button>
                                                                        <el-button type="primary" size="mini"
                                                                                   onClick={() => {
                                                                                       item.event()
                                                                                   }}>{this.$t('common_confirm')}
                                                                        </el-button>
                                                                    </div>
                                                                    <el-dropdown-item
                                                                        slot="reference">{item.content}</el-dropdown-item>
                                                                </el-popover> :
                                                                <el-dropdown-item
                                                                    nativeOnclick={() => item.event()}>{item.content}</el-dropdown-item>
                                                            : null
                                                    )
                                                })
                                            }
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                    :
                                    popover ?
                                        showPopover({index, popText, permission, className, event})
                                        :
                                        showToolTip({permission, content, className, event})
                            )
                        })
                    }
                </div>
            )
        },
        methods: {
            cancel(index) {
                this.$refs[index].doClose();
            },
            hasPermission(permission) {
                let findPermission = this.allAuth.find(item => item.action === permission)
                return findPermission && findPermission.type !== '2'
            },
        }
    }
</script>

<style scoped>

</style>
