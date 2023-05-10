const {
	__experimentalBoxControl: BoxControl,
	__experimentalToolsPanel: ToolsPanel,
	__experimentalToolsPanelItem: ToolsPanelItem,
	__experimentalUnitControl: UnitControl,
} = wp.components;
const { __ } = wp.i18n;

! ( function () {
	'use strict';
	var e,
		t,
		a,
		s,
		r = {
			207: function () {
				var e = window.wp.i18n,
					t = window.wp.blocks,
					a = window.wp.element,
					s = window.wp.blockEditor,
					r = window.wp.components,
					o = window.React;
				class n extends o.Component {
					constructor( e ) {
						super( e ),
							( this.state = { terms: [], tasksByGroup: {} } );
					}
					componentDidMount() {
						this.fetchTerms(), this.fetchTasks();
					}
					async fetchTerms() {
						let e = await fetch( '/wp-json/wp/v2/progress' ),
							t = await e.json();
						this.setState( { terms: t } );
					}
					async fetchTasks() {
						let e = await fetch(
								'/wp-json/wp/v2/tasks?_embed&per_page=100'
							),
							t = ( await e.json() ).reduce( ( e, t ) => {
								let a = t.progress[ 0 ];
								return (
									e[ a ] || ( e[ a ] = [] ),
									e[ a ].push( t ),
									e
								);
							}, {} );
						this.setState( { tasksByGroup: t } );
					}
					render() {
						let { terms: e, tasksByGroup: t } = this.state,
							{ backgroundColor: s } = this.props;
						return ( 0, a.createElement )(
							'div',
							{
								className: 'tasks-shortcode',
								style: {
									backgroundColor: s,
									gap: this.props.gapSize,
									paddingTop: this.props.paddingSize[ 'top' ],
									paddingLeft:
										this.props.paddingSize[ 'left' ],
									paddingRight:
										this.props.paddingSize[ 'right' ],
									paddingBottom:
										this.props.paddingSize[ 'bottom' ],
								},
							},
							e.map( ( e ) =>
								( 0, a.createElement )(
									'div',
									{
										key: e.id,
										className: 'tasks-group-wrap',
									},
									( 0, a.createElement )(
										'h3',
										null,
										e.name
									),
									t[ e.id ] && t[ e.id ].length > 0
										? ( 0, a.createElement )(
												'div',
												{
													className: 'tasks-list',
													style: {
														backgroundColor:
															this.props
																.tasksListBackgroundColor,
														gap: this.props
															.sgapSize,
														paddingTop:
															this.props
																.spaddingSize[
																'top'
															],
														paddingLeft:
															this.props
																.spaddingSize[
																'left'
															],
														paddingRight:
															this.props
																.spaddingSize[
																'right'
															],
														paddingBottom:
															this.props
																.spaddingSize[
																'bottom'
															],
													},
												},
												t[ e.id ].map( ( e ) =>
													( 0, a.createElement )(
														'div',
														{
															key: e.id,
															className:
																'task-item',
															style: {
																backgroundColor:
																	this.props
																		.cardBackgroundColor,
															},
														},
														( 0, a.createElement )(
															'span',
															{
																className:
																	'task-title',
															},
															e.title.rendered
														),
														( 0, a.createElement )(
															'button',
															{
																className:
																	'read-more wp-element-button',
																'data-id': e.id,
															},
															'Read More'
														),
														( 0, a.createElement )(
															'dialog',
															{
																className:
																	'task-content',
																id: `task-content-${ e.id }`,
															},
															( 0,
															a.createElement )(
																'div',
																{
																	className:
																		'wrap',
																},
																( 0,
																a.createElement )(
																	'h1',
																	null,
																	e.title
																		.rendered
																),
																( 0,
																a.createElement )(
																	'div',
																	{
																		dangerouslySetInnerHTML:
																			{
																				__html: e
																					.content
																					.rendered,
																			},
																	}
																),
																( 0,
																a.createElement )(
																	'div',
																	{
																		className:
																			'actions',
																	},
																	this.props
																		.isAdmin &&
																		( 0,
																		a.createElement )(
																			'a',
																			{
																				className:
																					'edit-task',
																				href: `/wp-admin/post.php?post=${ e.id }&action=edit`,
																				target: '_blank',
																			},
																			'Edit'
																		),
																	( 0,
																	a.createElement )(
																		'button',
																		{
																			className:
																				'close-dialog',
																			'data-id':
																				e.id,
																		},
																		'Close'
																	)
																)
															)
														)
													)
												)
										  )
										: ( 0, a.createElement )(
												'p',
												null,
												'No tasks found.'
										  )
								)
							)
						);
					}
				}
				var l = n;
				( 0, t.registerBlockType )( 'tasks-manager/tasks-progress', {
					title: ( 0, e.__ )( 'Tasks Manager Block' ),
					icon: 'calendar',
					category: 'common',
					edit( t ) {
						const bacis = [
							...( 0, s.useSetting )( 'spacing.spacingSizes' ),
						].map( ( s ) => ( { value: s.slug } ) );
						const additional = [ { value: 0 } ];
						const marks = additional.concat( bacis );
						const max = marks.length - 1;
						console.log( additional );
						console.log( marks );
						console.log( max );
						if (
							t &&
							document.getElementsByClassName(
								'tasks-shortcode'
							)[ 0 ]
						) {
							console.log( t );
						}
						let { attributes: m, setAttributes: g } = t,
							{
								backgroundColor: p,
								tasksListBackgroundColor: u,
								cardBackgroundColor: k,
								paddingSize: pt,
								gapSize: pl,
								spaddingSize: spt,
								sgapSize: spl,
							} = m,
							$ = {
								tab1: ( 0, a.createElement )(
									r.PanelBody,
									{
										title: ( 0, e.__ )(
											'Background',
											'tasks-manager'
										),
									},
									( 0, a.createElement )( r.ColorPalette, {
										value: p,
										colors: [
											...( 0, s.useSetting )(
												'color.palette'
											),
										],
										onChange( e ) {
											g( { backgroundColor: e } );
										},
									} ),
									wp.element.createElement( r.Button, {
										label: 'Set custom size',
										className: 'gap-button',
										icon: 'admin-settings',
										variant: 'secondary',
										onClick( e ) {
											var tab =
												document.querySelector(
													'.tab-one'
												);
											if (
												tab.classList.contains(
													'is-active'
												)
											) {
												let textElement =
													tab.parentElement.parentElement.querySelector(
														'.components-tab-panel__tab-content'
													);
												if ( textElement ) {
													textElement.classList.toggle(
														'gap'
													);
												}
											}
										},
									} ),
									wp.element.createElement( UnitControl, {
										label: __( 'BLOCK SPACING' ),
										onChange( e ) {
											g( { gapSize: e } );
										},
										value: pl,
										className: 'gap-text',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'BLOCK SPACING' ),
										onChange( e ) {
											g( {
												gapSize: `${ marks[ e ][ 'value' ] }px`,
											} );
										},
										value: pl,
										separatorType: 'topFullWidth',
										withInputField: false,
										max: max,
										initialPosition: parseInt( pl, 10 ),
										className: 'gap-line',
									} ),
									wp.element.createElement( r.Button, {
										label: 'Set custom size',
										className: 'padding-button',
										icon: 'admin-settings',
										variant: 'secondary',
										onClick( e ) {
											var tab =
												document.querySelector(
													'.tab-one'
												);
											if (
												tab.classList.contains(
													'is-active'
												)
											) {
												let textElement1 =
													tab.parentElement.parentElement.querySelector(
														'.components-tab-panel__tab-content'
													);
												if ( textElement1 ) {
													if (
														textElement1.classList.contains(
															'padding-full'
														)
													) {
														textElement1.classList.add(
															'padding-diff'
														);
														textElement1.classList.remove(
															'padding-full'
														);
													} else if (
														textElement1.classList.contains(
															'padding-diff'
														)
													) {
														textElement1.classList.remove(
															'padding-diff'
														);
													} else {
														textElement1.classList.add(
															'padding-full'
														);
													}
												}
											}
										},
									} ),
									wp.element.createElement(
										r.__experimentalBoxControl,
										{
											label: __( 'PADDING' ),
											onChange( e ) {
												g( { paddingSize: e } );
											},
											className: 'padding-box',
											values: pt,
											allowReset: false,
										}
									),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING' ),
										onChange( e ) {
											g( {
												paddingSize: {
													top: `${ marks[ e ][ 'value' ] }px`,
													bottom: `${ marks[ e ][ 'value' ] }px`,
													left: `${ marks[ e ][ 'value' ] }px`,
													right: `${ marks[ e ][ 'value' ] }px`,
												},
											} );
										},
										value: pt,

										max: max,
										max: max,
										separatorType: 'topFullWidth',
										withInputField: false,
										initialPosition: parseInt(
											pt[ 'top' ],
											10
										),
										className: 'padding-all',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING TOP' ),
										onChange( e ) {
											g( {
												paddingSize: {
													top: `${ marks[ e ][ 'value' ] }px`,
													bottom: pt[ 'bottom' ],
													left: pt[ 'left' ],
													right: pt[ 'right' ],
												},
											} );
										},
										value: pt[ 'top' ],
										separatorType: 'topFullWidth',
										withInputField: false,
										max: max,
										initialPosition: parseInt(
											pt[ 'top' ],
											10
										),
										className: 'padding-top',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING BOTTOM' ),
										onChange( e ) {
											g( {
												paddingSize: {
													top: pt[ 'top' ],
													bottom: `${ marks[ e ][ 'value' ] }px`,
													left: pt[ 'left' ],
													right: pt[ 'right' ],
												},
											} );
										},
										value: pt[ 'bottom' ],
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt(
											pt[ 'bottom' ],
											10
										),
										className: 'padding-bottom',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING LEFT' ),
										onChange( e ) {
											g( {
												paddingSize: {
													top: pt[ 'top' ],
													bottom: pt[ 'bottom' ],
													left: `${ marks[ e ][ 'value' ] }px`,
													right: pt[ 'right' ],
												},
											} );
										},
										value: pt[ 'left' ],
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt(
											pt[ 'left' ],
											10
										),
										className: 'padding-left',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING RIGHT' ),
										onChange( e ) {
											g( {
												paddingSize: {
													top: pt[ 'top' ],
													bottom: pt[ 'bottom' ],
													left: pt[ 'left' ],
													right: `${ marks[ e ][ 'value' ] }px`,
												},
											} );
										},
										value: pt[ 'right' ],
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt(
											pt[ 'right' ],
											10
										),
										className: 'padding-right',
									} )
								),
								tab2: ( 0, a.createElement )(
									r.PanelBody,
									{
										title: ( 0, e.__ )(
											'Background',
											'tasks-manager'
										),
									},
									( 0, a.createElement )( r.ColorPalette, {
										value: u,
										colors: [
											...( 0, s.useSetting )(
												'color.palette'
											),
										],
										onChange( e ) {
											g( {
												tasksListBackgroundColor: e,
											} );
										},
									} ),

									wp.element.createElement( r.Button, {
										label: 'Set custom size',
										className: 'gap-button',
										variant: 'secondary',
										icon: 'admin-settings',
										onClick( e ) {
											var tab =
												document.querySelector(
													'.tab-two'
												);
											if (
												tab.classList.contains(
													'is-active'
												)
											) {
												let textElement =
													tab.parentElement.parentElement.querySelector(
														'.components-tab-panel__tab-content'
													);
												if ( textElement ) {
													textElement.classList.toggle(
														'gap'
													);
												}
											}
										},
									} ),
									wp.element.createElement( UnitControl, {
										label: __( 'BLOCK SPACING' ),
										onChange( e ) {
											g( { sgapSize: e } );
										},
										value: spl,
										className: 'gap-text',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'BLOCK SPACING' ),
										onChange( e ) {
											g( {
												sgapSize: `${ marks[ e ][ 'value' ] }px`,
											} );
										},
										value: spl,
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt( spl, 10 ),
										className: 'gap-line',
									} ),
									wp.element.createElement( r.Button, {
										label: 'Set custom size',
										className: 'padding-button',
										icon: 'admin-settings',
										variant: 'secondary',
										onClick( e ) {
											var tab =
												document.querySelector(
													'.tab-two'
												);
											if (
												tab.classList.contains(
													'is-active'
												)
											) {
												let textElement1 =
													tab.parentElement.parentElement.querySelector(
														'.components-tab-panel__tab-content'
													);
												if ( textElement1 ) {
													if (
														textElement1.classList.contains(
															'padding-full'
														)
													) {
														textElement1.classList.add(
															'padding-diff'
														);
														textElement1.classList.remove(
															'padding-full'
														);
													} else if (
														textElement1.classList.contains(
															'padding-diff'
														)
													) {
														textElement1.classList.remove(
															'padding-diff'
														);
													} else {
														textElement1.classList.add(
															'padding-full'
														);
													}
												}
											}
										},
									} ),
									wp.element.createElement(
										r.__experimentalBoxControl,
										{
											label: __( 'PADDING' ),
											onChange( e ) {
												g( { spaddingSize: e } );
											},
											className: 'padding-box',
											values: spt,
											allowReset: false,
										}
									),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING' ),
										onChange( e ) {
											g( {
												spaddingSize: {
													top: `${ marks[ e ][ 'value' ] }px`,
													bottom: `${ marks[ e ][ 'value' ] }px`,
													left: `${ marks[ e ][ 'value' ] }px`,
													right: `${ marks[ e ][ 'value' ] }px`,
												},
											} );
										},
										value: spt,
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt(
											spt[ 'top' ],
											10
										),
										className: 'padding-all',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING TOP' ),
										onChange( e ) {
											g( {
												spaddingSize: {
													top: `${ marks[ e ][ 'value' ] }px`,
													bottom: spt[ 'bottom' ],
													left: spt[ 'left' ],
													right: spt[ 'right' ],
												},
											} );
										},
										value: spt[ 'top' ],
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt(
											spt[ 'top' ],
											10
										),
										className: 'padding-top',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING BOTTOM' ),
										onChange( e ) {
											g( {
												spaddingSize: {
													top: spt[ 'top' ],
													bottom: `${ marks[ e ][ 'value' ] }px`,
													left: spt[ 'left' ],
													right: spt[ 'right' ],
												},
											} );
										},
										value: spt[ 'bottom' ],
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt(
											spt[ 'bottom' ],
											10
										),
										className: 'padding-bottom',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING LEFT' ),
										onChange( e ) {
											g( {
												spaddingSize: {
													top: spt[ 'top' ],
													bottom: spt[ 'bottom' ],
													left: `${ marks[ e ][ 'value' ] }px`,
													right: spt[ 'right' ],
												},
											} );
										},
										value: spt[ 'left' ],
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt(
											spt[ 'left' ],
											10
										),
										className: 'padding-left',
									} ),
									wp.element.createElement( r.RangeControl, {
										label: __( 'PADDING RIGHT' ),
										onChange( e ) {
											g( {
												spaddingSize: {
													top: spt[ 'top' ],
													bottom: spt[ 'bottom' ],
													left: spt[ 'left' ],
													right: `${ marks[ e ][ 'value' ] }px`,
												},
											} );
										},
										value: spt[ 'right' ],
										separatorType: 'topFullWidth',
										withInputField: false,

										max: max,
										initialPosition: parseInt(
											spt[ 'right' ],
											10
										),
										className: 'padding-right',
									} )
								),
								tab3: ( 0, a.createElement )(
									r.PanelBody,
									{
										title: ( 0, e.__ )(
											'Background',
											'tasks-manager'
										),
									},
									( 0, a.createElement )( r.ColorPalette, {
										value: k,
										colors: [
											...( 0, s.useSetting )(
												'color.palette'
											),
										],
										onChange( e ) {
											g( { cardBackgroundColor: e } );
										},
									} )
								),
							};
						return ( 0, a.createElement )(
							'div',
							( 0, s.useBlockProps )(),
							( 0, a.createElement )(
								s.InspectorControls,
								null,
								( 0, a.createElement )(
									r.TabPanel,
									{
										className: 'my-tab-panel',
										activeClass: 'is-active',
										onSelect( e ) {
											console.log( 'Selecting tab', e );
										},
										tabs: [
											{
												name: 'tab1',
												title: ( 0, e.__ )(
													'Wrapper',
													'tasks-manager'
												),
												className: 'tab-one',
											},
											{
												name: 'tab2',
												title: ( 0, e.__ )(
													'Lists',
													'tasks-manager'
												),
												className: 'tab-two',
											},
											{
												name: 'tab3',
												title: ( 0, e.__ )(
													'Cards',
													'tasks-manager'
												),
												className: 'tab-three',
											},
										],
									},
									( e ) => $[ e.name ]
								)
							),
							( 0, a.createElement )( l, {
								block: 'tasks-manager/tasks-progress',
								attributes: m,
								backgroundColor: m.backgroundColor,
								tasksListBackgroundColor:
									m.tasksListBackgroundColor,
								cardBackgroundColor: m.cardBackgroundColor,
								paddingSize: m.paddingSize,
								gapSize: m.gapSize,
								spaddingSize: m.spaddingSize,
								sgapSize: m.sgapSize,
							} )
						);
					},
					save( e ) {
						let { attributes: t } = e,
							{
								backgroundColor: r,
								tasksListBackgroundColor: o,
								cardBackgroundColor: n,
								paddingSize: pn,
								gapSize: gn,
								spaddingSize: spn,
								sgapSize: sgn,
							} = t;
						return ( 0, a.createElement )(
							'div',
							s.useBlockProps.save(),
							( 0, a.createElement )( l, {
								backgroundColor: r,
								tasksListBackgroundColor: o,
								cardBackgroundColor: n,
								paddingSize: pn,
								gapSize: gn,
								spaddingSize: spn,
								sgapSize: sgn,
							} )
						);
					},
				} );
			},
		},
		o = {};
	function n( e ) {
		var t = o[ e ];
		if ( void 0 !== t ) return t.exports;
		var a = ( o[ e ] = { exports: {} } );
		return r[ e ]( a, a.exports, n ), a.exports;
	}
	( n.m = r ),
		( s = [] ),
		( n.O = function ( e, t, a, r ) {
			if ( ! t ) {
				var o = 1 / 0;
				for ( d = 0; d < s.length; d++ ) {
					( t = s[ d ][ 0 ] ),
						( a = s[ d ][ 1 ] ),
						( r = s[ d ][ 2 ] );
					for ( var l = ! 0, c = 0; c < t.length; c++ )
						o >= r &&
						Object.keys( n.O ).every( function ( e ) {
							return n.O[ e ]( t[ c ] );
						} )
							? t.splice( c--, 1 )
							: ( ( l = ! 1 ), r < o && ( o = r ) );
					if ( l ) {
						s.splice( d--, 1 );
						var i = a();
						void 0 !== i && ( e = i );
					}
				}
				return e;
			}
			r = r || 0;
			for ( var d = s.length; d > 0 && s[ d - 1 ][ 2 ] > r; d-- )
				s[ d ] = s[ d - 1 ];
			s[ d ] = [ t, a, r ];
		} ),
		( n.o = function ( e, t ) {
			return Object.prototype.hasOwnProperty.call( e, t );
		} ),
		( e = { 826: 0, 431: 0 } ),
		( n.O.j = function ( t ) {
			return 0 === e[ t ];
		} ),
		( t = function ( t, a ) {
			var s,
				r,
				o = a[ 0 ],
				l = a[ 1 ],
				c = a[ 2 ],
				i = 0;
			if (
				o.some( function ( t ) {
					return 0 !== e[ t ];
				} )
			) {
				for ( s in l ) n.o( l, s ) && ( n.m[ s ] = l[ s ] );
				if ( c ) var d = c( n );
			}
			for ( t && t( a ); i < o.length; i++ )
				( r = o[ i ] ),
					n.o( e, r ) && e[ r ] && e[ r ][ 0 ](),
					( e[ r ] = 0 );
			return n.O( d );
		} ),
		( a = self.webpackChunktask_manager_block =
			self.webpackChunktask_manager_block || [] ).forEach(
			t.bind( null, 0 )
		),
		( a.push = t.bind( null, a.push.bind( a ) ) );
	var l = n.O( void 0, [ 431 ], function () {
		return n( 207 );
	} );
	l = n.O( l );
} )();
