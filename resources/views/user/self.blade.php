@extends('layouts.app')

@section('content')
    <!-- Content
		============================================= -->
    <section id="content">
        <div class="content-wrap">
            <div class="container">

                <div class="row gx-5">

                    <div class="col-md-9">

                        <div class="heading-block border-0">
                            <h3>{{Auth()->user()->name}}</h3>
                            <span>{{Auth()->user()->email}}</span>
                        </div>

                        <div class="row">

                            <div class="col-lg-12">

                                <h5>Histórico de compras</h5>

                                <div>
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Estado</th>
                                            <th>#</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <code>5/23/2021</code>
                                            </td>
                                            <td>Payment for VPS2 completed</td>
                                            <td><a href="#">Test</a></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-100 line d-block d-md-none"></div>

                </div>

            </div>
        </div>
    </section><!-- #content end -->
@endsection
