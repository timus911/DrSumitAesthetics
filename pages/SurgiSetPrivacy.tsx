import React from 'react';
import SEO from '../components/SEO.tsx';
import { Shield, Lock, FileText, Mail, Server, Camera, CreditCard } from 'lucide-react';

const SurgiSetPrivacy: React.FC = () => {
    return (
        <div className="pt-24 pb-24 min-h-screen">
            <SEO
                description="Privacy Policy for SurgiSet (Instrument Tracker). Learn how we collect, use, and protect your data."
                keywords="SurgiSet, Privacy Policy, Instrument Tracker, Medical App Privacy"
                title="Privacy Policy | SurgiSet"
            />

            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-16 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#4A90E2]/10 rounded-lg border border-[#4A90E2]/20">
                            <Shield className="w-6 h-6 text-[#4A90E2]" />
                        </div>
                        <span className="text-[#4A90E2] text-xs font-bold tracking-[0.2em] uppercase">SurgiSet App</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Privacy Policy</h1>
                    <p className="text-gray-400 text-sm">Last Updated: February 4, 2026</p>
                </div>

                <div className="space-y-12">
                    {/* Section 1: Introduction */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                            <span className="text-[#4A90E2] text-sm font-sans font-bold opacity-50">01.</span>
                            Introduction
                        </h2>
                        <div className="pl-0 md:pl-8 text-gray-300 leading-relaxed font-light space-y-4">
                            <p>
                                SurgiSet ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how our mobile application collects, uses, and discloses information.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Information We Collect */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                            <span className="text-[#4A90E2] text-sm font-sans font-bold opacity-50">02.</span>
                            Information We Collect
                        </h2>

                        <div className="pl-0 md:pl-8 grid gap-6">

                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#4A90E2]/30 transition-colors">
                                <div className="flex items-start gap-4">
                                    <Server className="w-5 h-5 text-[#4A90E2] mt-1 shrink-0" />
                                    <div>
                                        <h3 className="text-white font-medium mb-2">Inventory Data</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            We store the names, types, and counts of the surgical instruments you input into the app.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#4A90E2]/30 transition-colors">
                                <div className="flex items-start gap-4">
                                    <Camera className="w-5 h-5 text-[#4A90E2] mt-1 shrink-0" />
                                    <div>
                                        <h3 className="text-white font-medium mb-2">Camera & Photos</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            We request access to your device's camera and photo library to allow you to capture and store images of your instrument sets for auditing purposes. These images are stored locally on your device or in your personal cloud backup.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#4A90E2]/30 transition-colors">
                                <div className="flex items-start gap-4">
                                    <CreditCard className="w-5 h-5 text-[#4A90E2] mt-1 shrink-0" />
                                    <div>
                                        <h3 className="text-white font-medium mb-2">Purchase Data</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            We use a third-party service, RevenueCat, to manage subscriptions and in-app purchases. RevenueCat tracks your purchase status (e.g., "Premium Active") using an anonymous app-user ID. We do not store your credit card information directly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Section 3: Third-Party Services */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                            <span className="text-[#4A90E2] text-sm font-sans font-bold opacity-50">03.</span>
                            Third-Party Services
                        </h2>
                        <div className="pl-0 md:pl-8 text-gray-300 leading-relaxed font-light">
                            <p className="mb-4">We may employ third-party companies and individuals due to the following reasons:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-400 ml-2">
                                <li>To facilitate our Service (Google Play Services)</li>
                                <li>To manage Payments (RevenueCat)</li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 4: Medical Disclaimer */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                            <span className="text-[#4A90E2] text-sm font-sans font-bold opacity-50">04.</span>
                            Medical Disclaimer
                        </h2>
                        <div className="pl-0 md:pl-8">
                            <div className="p-6 bg-red-500/5 rounded-xl border border-red-500/20">
                                <p className="text-gray-300 leading-relaxed font-light">
                                    This app is an inventory management utility for medical professionals. It <span className="font-medium text-white">does not</span> collect, store, or process Patient Health Information (PHI) or personal medical records.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Contact Us */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                            <span className="text-[#4A90E2] text-sm font-sans font-bold opacity-50">05.</span>
                            Contact Us
                        </h2>
                        <div className="pl-0 md:pl-8">
                            <p className="text-gray-300 mb-6 font-light">
                                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
                            </p>
                            <a href="mailto:timus.dev@gmail.com" className="inline-flex items-center gap-3 px-6 py-3 bg-[#4A90E2] text-white rounded-md hover:bg-[#357ABD] transition-colors font-medium text-sm tracking-wide">
                                <Mail className="w-4 h-4" />
                                timus.dev@gmail.com
                            </a>
                        </div>
                    </section>

                </div>

                {/* Footer Note */}
                <div className="mt-20 pt-8 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-600 uppercase tracking-widest">© 2026 SurgiSet • All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};

export default SurgiSetPrivacy;
